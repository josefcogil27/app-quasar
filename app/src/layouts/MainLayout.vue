<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-white">
      <q-toolbar>
        <q-btn
          class="btn"
          flat
          round
          color="secondary"
          icon="menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-toolbar-title class="title text-center text-secondary">
          Quasar App
        </q-toolbar-title>
      </q-toolbar>
      <div>
        <q-input
          @keypress.enter="getByName()"
          color="secondary"
          v-model="search"
          placeholder="Buscar Producto"
        >
          <template v-slot:prepend>
            <q-icon style="margin-left: 10px;" name="search" />
          </template>
        </q-input>
      </div>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="300"
      :breakpoint="10000"
    >
      <q-scroll-area class="fit">
        <q-list padding class="menu-list">
          <q-item class="max-width" v-ripple>
            <q-item-section avatar>
              <q-icon color="secondary" size="1.2rem" name="sort" />
            </q-item-section>
            <q-item-section class="text-secondary text-uppercase">
              Categorias
            </q-item-section>
          </q-item>
          <q-list
            v-for="(category, index) in categories"
            v-bind:key="index"
            style="margin-left: 1rem;"
            dense
            padding
          >
            <q-item @click="getByCategory(category.id)" clickable v-ripple>
              <q-item-section class="fs">
                {{ category.categoria }}
              </q-item-section>
            </q-item>
          </q-list>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <h6 v-show="show" class="text-center text-grey">Productos</h6>
      <h6
        v-show="!show"
        v-if="productInfo.length != 0"
        class="text-center text-grey"
      >
        Información del Producto
      </h6>
      <q-pull-to-refresh color="secondary" @refresh="refresh">
        <q-scroll-area
          v-show="show"
          :thumb-style="thumbStyle"
          style="height: 65vh; max-width: 100vw;"
        >
          <div class="q-py-xs">
            <h6 v-if="products.length == 0" class="text-center text-grey">
              No se han encontrado resultados para su búsqueda
            </h6>
            <q-list
              v-for="(product, index) in products"
              v-bind:key="index"
              style="margin-left: 1rem;"
              dense
              padding
            >
              <q-item class="list-item" clickable v-ripple>
                <q-item-section
                  @click="
                    getProduct(product.id);
                    show = !show;
                  "
                >
                  <q-item-label>{{ product.nom_inv }}</q-item-label>
                  <q-item-label caption
                    >Stock: {{ product.can_inv }}</q-item-label
                  >
                </q-item-section>
                <q-icon size="1.5rem" color="secondary" name="info" />
              </q-item>
            </q-list>
          </div>
        </q-scroll-area>
        <div
          v-show="!show"
          v-if="productInfo.length != 0"
          class="product-container"
        >
          <q-img src="../statics/tools.jpg" class="img" />
          <q-item class="list-item p-info" clickable v-ripple>
            <q-item-section>
              <q-item-label>{{ productInfo[0].nom_inv }}</q-item-label>
              <q-item-label>Stock: {{ productInfo[0].can_inv }}</q-item-label>
              <q-item-label
                >Precio: ${{ productInfo[0].pre_ven_inv }}</q-item-label
              >
              <q-item-label>{{ productInfo[0].descripcion }}</q-item-label>
              <q-item-label caption
                >Añadir al Carrito
                <q-icon size="1rem" color="secondary" name="shopping_cart"
              /></q-item-label>
            </q-item-section>
          </q-item>
          <q-icon
            clickable
            @click="show = !show"
            class="close"
            size="2rem"
            color="secondary"
            name="clear"
          />
        </div>
      </q-pull-to-refresh>
    </q-page-container>
    <q-icon
      v-show="show"
      clickable
      @click="getProducts()"
      class="replay"
      size="1.5rem"
      color="secondary"
      name="replay"
    />
  </q-layout>
</template>
<script>
export default {
  name: 'MainLayout',
  data () {
    return {
      text: '',
      leftDrawerOpen: false,
      categories: [],
      products: [],
      productInfo: [],
      search: '',
      show: true,
      thumbStyle: {
        right: '2px',
        borderRadius: '5px',
        backgroundColor: '#027be3',
        width: '5px',
        opacity: 0.75
      }
    }
  },
  methods: {
    getCategories () {
      this.$axios.get('http://localhost:3000/categories').then(categories => {
        this.categories = categories.data.categories
      })
    },
    getProducts () {
      this.$axios.get('http://localhost:3000/products').then(products => {
        this.products = products.data.products
      })
    },
    getProduct (id) {
      this.$axios
        .get(`http://localhost:3000/products/info/${id}`)
        .then(products => {
          this.productInfo = products.data.products
        })
    },
    getByCategory (id) {
      this.$axios
        .get(`http://localhost:3000/products/${id}`)
        .then(products => {
          this.products = products.data.products
        })
    },
    getByName () {
      this.$axios
        .get(`http://localhost:3000/products/search/${this.search}`)
        .then(products => {
          this.products = products.data.products
        })
    },
    refresh (done) {
      setTimeout(() => {
        this.getProducts()
        this.search = ''
        done()
      }, 1000)
    }
  },
  beforeMount () {
    this.getCategories()
    this.getProducts()
  }
}
</script>

<template>
  <b-card
    title="Todos as categorias"
    no-body
  >
    <b-card-body>
      <div class="d-flex justify-content-between  flex-wrap">

        <b-col
          lg="6"
          class="mb-1"
        >
          <!-- button on left -->
          <b-input-group
            label=""
            label-cols-sm="2"
            label-align-sm="left"
            label-size="lg"
            label-for="filterInput"
            class="mb-0"
          >
            <b-form-input
              id="filterInput"
              v-model="nomeCategoria"
              @input="handleInput"
              size="lg"
              type="search"
              placeholder="Pesquisando por..."
            />
            <b-input-group-append>
              <b-button
                variant="outline-primary"
                @click="pesquisaNome"
              >
                <feather-icon
                  size="16"
                  icon="SearchIcon"
                />

              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-col>

        <!--button on right-->
        <b-col
          lg="6"
          class="mb-1"
        >
          <b-form-group
            label=""
            label-size="md"
            label-align-sm="right"
            label-cols-sm="7"
            label-for="sortBySelect"
            class="mr-1 mb-md-0 align-items-center"
          >
            <b-input-group size="lg">
              <b-button
                size="md"
                variant="primary"
                :to="{ name: 'categoria-cadastro'}"
              >
                <feather-icon
                  size="18"
                  icon="PlusCircleIcon"
                />
                Nova categoria
              </b-button>
            </b-input-group>
          </b-form-group>

        </b-col>
      </div>
    </b-card-body>

    <b-table
      striped
      hover
      responsive
      show-empty
      class="position-relative"
      :per-page="perPage"
      :current-page="currentPage"
      :items="categorias"
      :fields="fields"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
    >

      <template #empty>

        <div class="d-flex justify-content-center">
          <b-spinner
            variant="primary"
            label="Carregando..."
          />
          <h3
            class="text-center ml-1"
            style="color:#7367f0;"
          >Categoria não
            localizada</h3>
        </div>

      </template>

      <template #cell(actions)="data">
        <b-button
          variant="primary"
          class="mr-1"
          :to="{ name: 'categoria-edit', params: { id: data.item.id } }"
        >
          <feather-icon
            size="18"
            icon="EditIcon"
          />
        </b-button>

        <b-button
          variant="danger"
          @click="() => deleteCategoria(data.item.id)"
        >
          <feather-icon
            size="18"
            icon="Trash2Icon"
          />
        </b-button>
      </template>
    </b-table>

    <b-card-body class="d-flex justify-content-between flex-wrap pt-0">

      <!-- page length -->
      <b-form-group
        label="Por Pág"
        label-cols="6"
        label-align="left"
        label-size="sm"
        label-for="sortBySelect"
        class="text-nowrap mb-md-0 mr-1 align-items-center"
      >
        <b-form-select
          id="perPageSelect"
          v-model="perPage"
          size="sm"
          inline
          :options="pageOptions"
        />
      </b-form-group>

      <!-- pagination -->
      <div>
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          first-number
          last-number
          prev-class="prev-item"
          next-class="next-item"
          class="mb-0 align-items-center"
        >
          <template #prev-text>
            <feather-icon
              icon="ChevronLeftIcon"
              size="18"
            />
          </template>
          <template #next-text>
            <feather-icon
              icon="ChevronRightIcon"
              size="18"
            />
          </template>
        </b-pagination>
      </div>
    </b-card-body>

  </b-card>
</template>

<script>
  
import { debounce } from 'lodash';

import {
  BTable,
  BAvatar,
  BBadge,
  BFormGroup,
  BFormSelect,
  BPagination,
  BInputGroup,
  BFormInput,
  BInputGroupAppend,
  BButton,
  BSpinner,
  BCardBody,
  BCard,
  BCol,
} from 'bootstrap-vue'

export default {
  
  components: {
    BCard,
    BCol,
    BTable,
    BAvatar,
    BBadge,
    BFormGroup,
    BFormSelect,
    BPagination,
    BInputGroup,
    BFormInput,
    BSpinner,
    BInputGroupAppend,
    BButton,
    BCardBody,
  },

  data() {
    return {
      perPage: 5,
      pageOptions: [3, 5, 10],
      totalRows: 1,
      currentPage: 1,
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      infoModal: {
        id: 'info-modal',
        title: '',
        content: '',
      },
      categorias: [],
      fields: [
        {
          key: 'name', label: 'Nome',
        },
        {
          key: 'description', label: 'Descrição',
        },
        {
          key: 'actions', label: 'Ações',
        },

      ],
      nomeCategoria: '',
    }
  },

  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => ({ text: f.label, value: f.key }))
    },
  },

  mounted() {
    // Set the initial number of items
    this.totalRows = this.categorias.length
  },

  created() {
    this.$http.get('bookshelf/categories/')
      .then(response => this.categorias = response.data.data)
  },

  methods: {

    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`
      this.infoModal.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },

    resetInfoModal() {
      this.infoModal.title = ''
      this.infoModal.content = ''
    },

    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },

    deleteCategoria(id) {
      this.$swal({
        title: 'Tem certeza?',
        text: 'Você não conseguirá desfazer isso.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, excluir',
        cancelButtonText: 'Cancelar',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      })
        .then(res => {
          if (res.isConfirmed) {
            this.$http
              .delete(`/bookshelf/categories/${id}`)
              .then(response => {
                if (response.status == 200) {
                  this.$swal({
                    icon: 'success',
                    title: 'Excluído',
                    text: 'A categoria foi excluída com sucesso!',
                    customClass: {
                      confirmButton: 'btn btn-success',
                    },
                  })
                  this.$http.get('bookshelf/categories/')
                    .then(response => this.categorias = response.data.data)
                } else {
                  this.$swal({
                    title: 'Falha ao excluir!',
                    text: 'Ocorreu um erro ao excluir a categoria',
                    icon: 'error',
                    customClass: {
                      confirmButton: 'btn btn-primary',
                    },
                    buttonsStyling: false,
                  })
                }
              })
              .catch(error => {
                reject(error)
              })
          }
        })
    },

    handleInput: debounce(function () {
      this.pesquisaNome()
    }, 300),

    pesquisaNome() {
      this.$http
        .get(`bookshelf/categories/pesquisar/nome/${this.nomeCategoria}`)
        .then(response => this.categorias = response.data.data)
    },

  },
}
</script>

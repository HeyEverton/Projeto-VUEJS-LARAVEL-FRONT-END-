import Vue from 'vue'
import VueRouter from 'vue-router'
// import useJwt from '@/auth/jwt/useJwt'
import axios from 'axios'
import Guard from '@/service/middleware'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      beforeEnter: Guard.redirectIfNotAuthenticated,
      name: 'home',
      component: () => import('@/views/Home.vue'),
      meta: {
        pageTitle: 'Home',
        breadcrumb: [
          {
            text: 'Home',
            active: true,
          },
        ],
      },
    },
    {
      path: '/livro-list',
      beforeEnter: Guard.redirectIfNotAuthenticated,
      name: 'livro-list',
      component: () => import('@/views/livro/TodosLivros.vue'),
      meta: {
        pageTitle: 'Todos os livros',
        breadcrumb: [
          {
            text: 'Livros',
            active: true,
          },
        ],
      },
    },
    {
      path: '/livro-cadastro',
      beforeEnter: Guard.redirectIfNotAuthenticated,
      name: 'livro-cadastro',
      component: () => import('@/views/livro/LivroCadastro.vue'),
      meta: {
        pageTitle: 'Cadastre um livro',
        breadcrumb: [
          {
            text: 'Livros',
            active: true,
          },
        ],
      },
    },
    {
      path: '/livro-edit/:id',
      beforeEnter: Guard.redirectIfNotAuthenticated,
      name: 'livro-edit',
      component: () => import('@/views/livro/LivroEdit.vue'),
      meta: {
        pageTitle: 'Editar livro',
        breadcrumb: [
          {
            text: 'Autor',
            active: true,
          },
        ],
      },
    },

    {
      path: '/perfil',
      beforeEnter: Guard.redirectIfNotAuthenticated,
      name: 'perfil',
      component: () => import('@/views/perfil/Perfil.vue'),
      meta: {
        pageTitle: 'Seu perfil',
        breadcrumb: [
          {
            text: 'Perfil',
            active: true,
          },
        ],
      },
    },

    {
      path: '/autor-cadastro',
      beforeEnter: Guard.redirectIfNotAuthenticated,
      name: 'autor-cadastro',
      component: () => import('@/views/autor/AutorCadastro.vue'),
      meta: {
        pageTitle: 'Cadastre um autor',
        breadcrumb: [
          {
            text: 'Autores',
            active: true,
          },
        ],
      },
    },

    {
      path: '/autor-list',
      beforeEnter: Guard.redirectIfNotAuthenticated,
      name: 'autor-list',
      component: () => import('@/views/autor/TodosAutores.vue'),
      meta: {
        pageTitle: 'Todas os autores',
        breadcrumb: [
          {
            text: 'Autores',
            active: true,
          },
        ],
      },
    },

    {
      path: '/autor-edit/:id',
      beforeEnter: Guard.redirectIfNotAuthenticated,
      name: 'autor-edit',
      component: () => import('@/views/autor/AutorEdit.vue'),
      meta: {
        pageTitle: 'Editar autor',
        breadcrumb: [
          {
            text: 'Autor',
            active: true,
          },
        ],
      },
    },

    {
      path: '/user-cadastro',
      beforeEnter: Guard.redirectIfNotAuthenticated,
      name: 'user-cadastro',
      component: () => import('@/views/user/UserCadastro.vue'),
      meta: {
        pageTitle: 'Cadastrar usuário',
        breadcrumb: [
          {
            text: 'Usuário',
            active: true,
          },
        ],
      },
    },

    {
      path: '/user-login',
      beforeEnter: Guard.redirectIfAuthenticated,
      name: 'user-login',
      component: () => import('@/views/Login.vue'),
      meta: {
        pageTitle: 'Login usuário',
        layout: 'full',
        breadcrumb: [
          {
            text: 'Usuário',
            active: true,
          },
        ],
      },
    },

    {
      path: '/user-logout',
      name: 'user-logout',
      // component: () => import('@/views/Login.vue'),

    },

    {
      path: '/user-edit/:id',
      name: 'user-edit',
      component: () => import('@/views/user/UserEdit.vue'),
      meta: {
        pageTitle: 'Editar usuário',
        breadcrumb: [
          {
            text: 'Usuário',
            active: true,
          },
        ],
      },
    },

    {
      path: '/user-list',
      beforeEnter: Guard.redirectIfNotAuthenticated,
      name: 'user-list',
      component: () => import('@/views/user/TodosUsuarios.vue'),
    },

    {
      path: '/error-404',
      name: 'error-404',
      component: () => import('@/views/error/Error404.vue'),
      meta: {
        layout: 'full',
      },
    },

    {
      path: '*',
      redirect: 'error-404',
    },

    {
      path: '/categoria-cadastro',
      beforeEnter: Guard.redirectIfNotAuthenticated,
      name: 'categoria-cadastro',
      component: () => import('@/views/category/CategoriaCadastro.vue'),
      meta: {
        pageTitle: 'Cadastre uma categoria',
        breadcrumb: [
          {
            text: 'Categoria',
            active: true,
          },
        ],
      },
    },

    {
      path: '/categoria-list',
      beforeEnter: Guard.redirectIfNotAuthenticated,
      name: 'categoria-list',
      component: () => import('@/views/category/TodasCategorias.vue'),
      meta: {
        pageTitle: 'Todas as categorias',
        breadcrumb: [
          {
            text: 'Categorias',
            active: true,
          },
        ],
      },
    },

    {
      path: '/categoria/edit/:id',
      name: 'categoria-edit',
      component: () => import('@/views/category/CategoriaEdit.vue'),
      meta: {
        pageTitle: 'Editar categoria',
        breadcrumb: [
          {
            text: 'Categoria',
            active: true,
          },
        ],
      },
    },

    {
      path: '/editora-cadastro',
      beforeEnter: Guard.redirectIfNotAuthenticated,
      name: 'editora-cadastro',
      component: () => import('@/views/editora/EditoraCadastro.vue'),
      meta: {
        pageTitle: 'Cadastre uma editora',
        breadcrumb: [
          {
            text: 'Editora',
            active: true,
          },
        ],
      },
    },

    {
      path: '/editora-list',
      beforeEnter: Guard.redirectIfNotAuthenticated,
      name: 'editora-list',
      component: () => import('@/views/editora/TodasEditoras.vue'),
      meta: {
        pageTitle: 'Todas as editoras',
        breadcrumb: [
          {
            text: 'Editoras',
            active: true,
          },
        ],
      },
    },

    {
      path: '/editora/edit/:id',
      beforeEnter: Guard.redirectIfNotAuthenticated,
      name: 'editora-edit',
      component: () => import('@/views/editora/EditoraEdit.vue'),
      meta: {
        pageTitle: 'Editar editora',
        breadcrumb: [
          {
            text: 'Editora',
            active: true,
          },
        ],
      },
    },
  ],
})

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})
// router.beforeEach((to, from, next) => {

//   if (to.name !== "user-login" && to.name !== "user-cadastro" && !localStorage.getItem('UserData') && !localStorage.getItem('token')) {
//     next({ name: 'user-login' })
//   }
// })

export default router

import { GetterTree, MutationTree, ActionTree } from 'vuex'
import { State, Deal } from './types'
import axios from 'axios'

export const state: State = {
    // deals 
    deals: [],
    allAvailableLoading: true,
    randomDeal: {
        id: 0,
        urlPrefix: '',
        images: [''],
        priceText: '',
        totalBought: 0,
        totalRemaining: 0,
        price: 0,
        depositPrice: 0,
        pricePerPerson: 0,
        headline: '',
        display: {
            discountAmount: false,
            quantity: false,
            quantityRemaining: false,
            endDate: false,
            discount: false,
            bought: false,
            previousDeal: false,
            deliveryAddress: false,
            business: false,
            timer: false,
            flashDeal: false,
            priceText: false,
            lastChance: false,
            containsProductImages: false
        },
        priceIndicative: false,
        discount: 0,
        discountPercentage: 0,
        originalPrice: 0,
        closingDate: 0,
        expiryDate: 0,
        flashDealDate: 0,
        currency: '',
        soldText: '',
        title: '',
        business: {},
        urlPath: '',
        category: {
            id: 0,
            name: '',
            shortName: '',
            position: 0,
            canonicalPathType: '',
            displayInFe: null,
            locations: []
        }
    },
    randomLoading: true,
    sortAsc: true,
    topTenDeals: [],
    topTenLoading: true,
    currentDeal: {
        id: 0,
        urlPrefix: '',
        images: [''],
        priceText: '',
        totalBought: 0,
        totalRemaining: 0,
        price: 0,
        depositPrice: 0,
        pricePerPerson: 0,
        headline: '',
        display: {
            discountAmount: false,
            quantity: false,
            quantityRemaining: false,
            endDate: false,
            discount: false,
            bought: false,
            previousDeal: false,
            deliveryAddress: false,
            business: false,
            timer: false,
            flashDeal: false,
            priceText: false,
            lastChance: false,
            containsProductImages: false
        },
        priceIndicative: false,
        discount: 0,
        discountPercentage: 0,
        originalPrice: 0,
        closingDate: 0,
        expiryDate: 0,
        flashDealDate: 0,
        currency: '',
        soldText: '',
        title: '',
        business: {},
        urlPath: '',
        category: {
            id: 0,
            name: '',
            shortName: '',
            position: 0,
            canonicalPathType: '',
            displayInFe: null,
            locations: []
        }
    },
    isCurrentDealLoading: true,
    // categories
    categories: [],
    isCategoriesLoading: true,
    currentDealCategory: '',
    currentDealCategoryLoading: true,
    dealsPerCurrentCategory: [],
    isDealsPerCurrentCategoryLoading: true,
    categorySuccessStatus: true
}

export const getters: GetterTree<State, any> = {
    // deals
    allAvailableDeals: state => state.deals,
    topTenDeals: state => state.topTenDeals,
    isTopTenLoading: state => state.topTenLoading,
    randomDeal: state => state.randomDeal,
    isRandomDealLoading: state => state.randomLoading,
    currentDeal: state => state.currentDeal,
    isCurrentDealLoading: state => state.isCurrentDealLoading,
    // categories 
    allCategories: state => state.categories,
    isCategoriesLoading: state => state.isCategoriesLoading,
    currentDealCategory: state => state.currentDealCategory,
    relatedDeals: state => state.dealsPerCurrentCategory.slice(0, 3),
    isDealsPerCurrentCategoryLoading: state => state.isDealsPerCurrentCategoryLoading,
    categorySuccessStatus: state => state.categorySuccessStatus,
    dealsPerCurrentCategory: state => state.dealsPerCurrentCategory
}

export const mutations: MutationTree<State> = {
    // deals 
    updateDeals(state, deals) {
        state.deals = deals
    },
    changeLoadingState(state, loading) {
        state.allAvailableLoading = loading
    },
    updateRandomDeal(state, randomDeal) {
        state.randomDeal = randomDeal
    },
    changeRandomLoadingState(state, loading) {
        state.randomLoading = loading
    },
    changeSortingOrder(state) {
        state.sortAsc = !state.sortAsc
    },
    updateTopTen(state, deals) {
        state.topTenDeals = deals
    },
    changeTopTenLoadingState(state, loading) {
        state.topTenLoading = loading
    },
    updateCurrentDeal(state, deal) {
        state.currentDeal = deal
    },
    changeCurrentDealLoadingState(state, loading) {
        state.isCurrentDealLoading = loading
    },
    // categories 
    updateCurrentDealCategory(state, category) {
        state.currentDealCategory = category
    },
    changeCurrentDealCategoryLoadingState(state, loading) {
        state.currentDealCategoryLoading = loading
    },
    updateDealsPerCurrentCategory(state, deals) {
        state.dealsPerCurrentCategory = deals
    },
    changeDealsPerCurrentCategoryLoadingState(state, loading) {
        state.isDealsPerCurrentCategoryLoading = loading
    },
    updateAllAvailableCategories(state, categories) {
        state.categories = categories
    },
    changeCategoriesLoadingState(state, loading) {
        state.isCategoriesLoading = loading
    },
    updateCategorySuccessStatus(state, status) {
        state.categorySuccessStatus = status
    }

}

export const actions: ActionTree<State, any> = {
    // deals 
    loadAllAvailableDeals({
        commit
    }) {
        axios
            .get('https://public-api.livingsocial.co.uk/v1/deal/london')
            .then(response => {
                commit('updateDeals', response.data.deals)
                commit('changeLoadingState', false)
            })
    },
    loadTopTenDeals({
        commit
    }) {
        axios
            .get('https://public-api.livingsocial.co.uk/v1/deal/london')
            .then(response => {
                commit('updateTopTen', response.data.deals.slice(0, 10))
                commit('changeTopTenLoadingState', false)
            })

    },
    getRandomDeal({ commit
    }) {
        let randomNum: number = Math.floor(
            Math.random() * state.deals.length
        );
        commit('updateRandomDeal', state.deals[randomNum])
        commit('changeRandomLoadingState', false)
    },
    sortDeals({ commit
    }) {
      state.sortAsc = !state.sortAsc
      if (state.sortAsc) {
      let updatedState = state.topTenDeals.sort((a, b) => (a.price > b.price ? 1 : -1))
            commit('updateTopTen', updatedState)
        } else {
            let updatedState = state.topTenDeals.sort((a, b) => (a.price < b.price ? 1 : -1))
      commit('updateTopTen', updatedState)
    }
  },
  getCurrentDeal ({ commit, dispatch }, dealId
  ) {
    axios
    .get('https://public-api.livingsocial.co.uk/v1/deal/' + dealId)
    .then(response => {
        commit('updateCurrentDeal', response.data)
        commit('changeCurrentDealLoadingState', false)
        dispatch('fetchDealsByCategory', response.data.category.shortName)
    })     
  },
  // categories
    fetchDealsByCategory ({
    commit
  }, category) {
      console.log("dispatched category", category)
    axios
      .get('https://public-api.livingsocial.co.uk/v1/deal/london/' + category)
      .then(response => {
        commit('updateCategorySuccessStatus', true)
        commit('updateDealsPerCurrentCategory', response.data.deals)
        commit('changeDealsPerCurrentCategoryLoadingState', false)
            })
      .catch((error) => {
        if (error.response.status === 404) {
          commit('updateCategorySuccessStatus', false)
          commit('changeDealsPerCurrentCategoryLoadingState', false)
        }
      })
  },
  fetchAllCategories ({
        commit
  }) {
    axios
      .get('https://public-api.livingsocial.co.uk/v1/category')
      .then(response => {
        let availableCategories = response.data.reduce(function (
          categoriesArray: any[],
          catObj: {
                        canonicalPathType: string
                        dealCategories: [{
                            canonicalPathType: string
                            displayInFe: any
                            id: number
                            locations: any[]
                            name: string
                            position: number
                            shortName: string
                        }]
                        displayInFe: string
                        id: number
                        name: string
                        position: number
                        shortName: string
                        subCategories: any[]
                        _score: string
                    }
         ) {
          if (catObj['dealCategories'].length === 1) {
                        let newObj = {
              displayName: catObj['dealCategories'][0].name,
              urlName: catObj['dealCategories'][0].shortName
                }
                categoriesArray.push(newObj)
               }
              return categoriesArray
        },
        [])
            commit('updateAllAvailableCategories', availableCategories)
            commit('changeCategoriesLoadingState', false)
        })
  },
  resetCategorySuccessStatus ({
    commit
  }) {
    commit('updateCategorySuccessStatus', true)
  }
}

// ===============================================================
// Add mobile nav collapse functionality

// document.addEventListener('DOMContentLoaded', function() {
//   var elems = document.querySelectorAll('.sidenav');
//   var instances = M.Sidenav.init(elems, options);
// });

// Or with jQuery

// $(document).ready(function(){
//   $('.sidenav').sidenav();
// });

// ===============================================================
// App structure - module pattern:
// - storage controller - localStorage
// - item controller - local data for items
// - UI controller - showing/hiding/input etc
// - app controller - integration, event listeners, initializer
// ===============================================================

// ===============================================================
// STORAGE CONTROLLER
// ===============================================================
const StorageCtrl = (function() {
  console.log('storage controller active')
})()

// ===============================================================
// ITEM CONTROLLER
// ===============================================================
const ItemCtrl = (function() {
  // Item constructor
  const Item = function(id, name, price, brand, source, amount, protein, fat, carbs, per) {
    this.id = id
    this.name = name
    this.price = price
    this.source = source
    this.amount = amount
    this.protein = protein
    this.fat = fat
    this.carbs = carbs
    this.per = per
    this.servings = amount / per
    this.totalProtein = protein * this.servings
    this.totalCarbs = carbs * this.servings
    this.totalFat = fat * this.servings
    this.pricePerFat = price / this.totalFat
    this.pricePerCarbs = price / this.totalCarbs
    this.pricePerProtein = price / this.totalProtein
    this.totalCalories = ((this.protein + this.carbs) * 4 + (this.fat * 9))
    this.pricePerCalorie = price / this.totalCalories
  }

  // Data structure / State
  const data = {
    items: [
      {
        id: 0,
        name: 'Cashews',
        price: 18.99,
        brand: 'Dan-D-Pack',
        source: 'Loblaws', 
        amount: 900, 
        protein: 7, 
        fat: 19, 
        carbs: 12, 
        per: 40
      },
      {
        id: 1,
        name: 'Protein Powder',
        price: 49.99,
        brand: 'Garden Of Life',
        source: 'Body Energy Club', 
        amount: 969, 
        protein: 20, 
        fat: 1.5, 
        carbs: 8, 
        per: 35
      },
      {
        id: 2,
        name: 'Dark Chocolate, 85%',
        price: 2.69,
        brand: 'President\'s Choice',
        source: 'Save-On-Foods', 
        amount: 100, 
        protein: 4, 
        fat: 19, 
        carbs: 15, 
        per: 40
      },
    ],
    currentItem: null, // this is intended for updates
    totalCalories: 0
  }

  // public methods
  return {
    getItems: function() {
      return data.items
    },
    logData: function() {
      return data
    },
    calculateNewItem: function() {
      // console.log(data.items)
      data.items.forEach(function(item){
        console.log(item)
        let newItem = new Item(item.id, item.name, item.price, item.brand, item.source, item.amount, item.protein, item.fat, item.carbs, item.per)
        console.log(`New item: ${newItem.pricePerProtein}`)
      })
    }
  }
})()

// ===============================================================
// UI CONTROLLER
// ===============================================================
const UICtrl = (function() {
  console.log('UI controller active')

  // public methods
  return {
    populateItemList: function(items) {
      let html = ''
      items.forEach(function(item) {
        console.log(item)
        html += `
      <tr class="food-item" id="item-${item.id}">
        <td>
          <span class="table-item">
            <span class="item-name-data em">${item.name}</span>
          </span>
          <span class="table-item">
            <span class="item item-brand-data">${item.brand}</span>
            <span class="spacer-1">,</span>
            <span class="item item-source-data">${item.source}</span>
          </span>
          <span class="table-item">
            <span class="item item-amount-data">${item.amount}</span>
            <span class="spacer-2">@</span>
            <span class="item item-price-data">$${item.price}</span>
          </span>
        </td>
        <td>
          <span class="table-item vertical fat">
            <span class="item total-fat">${item.totalFat}</span>
            <span class="item price-per-gram-fat">${item.pricePerFat}</span>
          </span>
        </td>
        <td>
          <span class="table-item vertical carbs">
            <span class="item total-carbs">${item.totalCarbs}</span>
            <span class="item price-per-gram-carbs">${item.pricePerCarbs}</span>
          </span>
        </td>
        <td>
            <span class="table-item vertical protein">
              <span class="item total-protein">${item.totalProtein}</span>
              <span class="item price-per-gram-protein">${item.pricePerProtein}</span>
            </span>
          </td>
        <td>
          <span class="table-item vertical calories">
            <span class="item total-calories">${item.totalCalories}</span>
            <span class="item price-per-gram-calories">${item.pricePerCalories}</span>
          </span>
        </td>
        <td>
          <a href="#" class="secondary-content">
            <i class="fa fa-pencil"></i>
          </a>
        </td>
      </tr>
          `

          // insert list items
          document.querySelector('#items-list').innerHTML = html
      })
    }
  }

})()

// ===============================================================
// APP CONTROLLER
// ===============================================================
const App = (function(ItemCtrl, UICtrl, StorageCtrl) {

  // public methods
  return {
    init: function(){
      // console.log('Init app')
      
      // fetch items from data store
      const items = ItemCtrl.getItems()

      // populate table with item data
      UICtrl.populateItemList(items)
    }
  }

})(ItemCtrl, UICtrl, StorageCtrl)

App.init()
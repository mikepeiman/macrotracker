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
    this.brand = brand
    this.price = price
    this.source = source
    this.amount = amount
    this.protein = protein
    this.fat = fat
    this.carbs = carbs
    this.per = per
    this.servings = Math.round((this.amount / this.per)*100)/100
    this.totalProtein = Math.round((this.amount / this.per * this.protein)*100)/100
    this.totalCarbs = Math.round((this.carbs * this.servings)*100)/100
    this.totalFat = Math.round((this.fat * this.servings)*100)/100
    this.pricePerFat =(this.price / this.totalFat).toFixed(2)
    this.pricePerCarbs =(this.price / this.totalCarbs).toFixed(2)
    this.pricePerProtein =(this.price / this.totalProtein).toFixed(2)
    this.totalCalories = Math.round(((this.totalProtein + this.totalCarbs) * 4) + (this.totalFat * 9)*100)/100
    this.pricePerCalorie =(this.price / this.totalCalories).toFixed(3)
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
    calculateNewItems: function() {
      // console.log(data.items)
      const newItems = []
      data.items.forEach(function(item){
        let newItem = new Item(item.id, item.name, item.price, item.brand, item.source, item.amount, item.protein, item.fat, item.carbs, item.per)
        console.log(`New item: ${newItem.name}`)
        newItems.push(newItem)
      })
      return newItems
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
        html += `
      <tr class="food-item" id="item-${item.id}">
        <td>
          <span class="display-flex">
            <span class="item-name-data em">${item.name}</span>
          </span>
          <span class="display-inline-block">
            <span class="item item-brand-data">${item.brand}</span>,
            <span class="item item-source-data">${item.source}</span>
          </span>
        </td>
        <td>
          <span class="display-flex vertical">
            <span class="item item-amount-data">${item.amount}g</span>
            <span class="item item-price-data">$${item.price}</span>
          </span>
        </td>
        <td>
          <span class="display-flex vertical fat">
            <span class="item total-fat">${item.totalFat}g</span>
            <span class="item price-per-gram-fat">$${item.pricePerFat}</span>
          </span>
        </td>
        <td>
          <span class="display-flex vertical carbs">
            <span class="item total-carbs">${item.totalCarbs}g</span>
            <span class="item price-per-gram-carbs">$${item.pricePerCarbs}</span>
          </span>
        </td>
        <td>
            <span class="display-flex vertical protein">
              <span class="item total-protein">${item.totalProtein}g</span>
              <span class="item price-per-gram-protein">$${item.pricePerProtein}</span>
            </span>
          </td>
        <td>
          <span class="display-flex vertical calories">
            <span class="item total-calories">${item.totalCalories}</span>
            <span class="item price-per-gram-calories">$${item.pricePerCalorie}</span>
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
      const newItems = ItemCtrl.calculateNewItems(items)

      // populate table with item data
      UICtrl.populateItemList(newItems)
    }
  }

})(ItemCtrl, UICtrl, StorageCtrl)

App.init()
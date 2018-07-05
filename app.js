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
const StorageCtrl = (function () {
  console.log('storage controller active')
})()

// ===============================================================
// ITEM CONTROLLER
// ===============================================================
const ItemCtrl = (function () {
  // Item constructor
  const Item = function (id, name, price, brand, source, amount, protein, fat, carbs, servingSize) {
    this.id = id
    this.name = name
    this.brand = brand
    this.price = price
    this.source = source
    this.amount = amount
    this.protein = protein
    this.fat = fat
    this.carbs = carbs
    this.servingSize = servingSize
    this.servings = Math.round((this.amount / this.servingSize) * 100) / 100
    this.totalProtein = Math.round((this.amount / this.servingSize * this.protein) * 100) / 100
    this.totalCarbs = Math.round((this.carbs * this.servings) * 100) / 100
    this.totalFat = Math.round((this.fat * this.servings) * 100) / 100
    this.pricePerFat = (this.price / this.totalFat).toFixed(2)
    this.pricePerCarbs = (this.price / this.totalCarbs).toFixed(2)
    this.pricePerProtein = (this.price / this.totalProtein).toFixed(2)
    this.totalCalories = Math.round(((this.totalProtein + this.totalCarbs) * 4) + (this.totalFat * 9) * 100) / 100
    this.pricePerCalorie = (this.price / this.totalCalories).toFixed(3)
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
        servingSize: 40
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
        servingSize: 35
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
        servingSize: 40
      },
    ],
    currentItem: null, // this is intended for updates
    totalCalories: 0
  }

  // public methods
  return {
    getItems: function () {
      return data.items
    },
    calculateNewItems: function () {
      // console.log(data.items)
      const newItems = []
      data.items.forEach(function (item) {
        let newItem = new Item(item.id, item.name, item.price, item.brand, item.source, item.amount, item.protein, item.fat, item.carbs, item.servingSize)
        console.log(`New item: ${newItem.name}`)
        newItems.push(newItem)
      })
      return newItems
    },
    addItem: function (name, price, brand, source, amount, protein, fat, carbs, servingSize) {
      console.log(name, price, brand, source, amount, protein, fat, carbs, servingSize)

      // create unique ID per item
      let ID
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1
        // Length of items collection (eg 3 items)
        // Access the last item through array indexing (hence the '- 1')
        // Access the value of that item's ID property ('.id')
        // Add one more to create the next unique ID in sequence

      } else {
        ID = 0
      }

      // Create new item
      let newItem = new Item(ID, name, price, brand, source, amount, protein, fat, carbs, servingSize)
      console.log(`New item: ${newItem.name}`)
      // add to data items collection
      data.items.push(newItem)
      // return the item so we can pass it to UI controller
      return newItem
    }
  }
})()

// ===============================================================
// ===============================================================
// UI CONTROLLER
// ===============================================================
// ===============================================================

const UICtrl = (function () {
  // set a UI Selectors collection to centralize DOM selectors;
  // allowing for a more robust/scalable app. Easier updates if HTML markup is changed
  const UISelectors = {
    itemList: '#items-list',
    addItem: '#add-item-button',
    itemNameInput: '#item-name-input',
    itemBrandInput: '#item-brand-input',
    itemSourceInput: '#item-source-input',
    itemPriceInput: '#item-price-input',
    itemAmountInput: '#item-amount-input',
    itemServingSizeInput: '#item-serving-size-input',
    itemProteinInput: '#item-protein-input',
    itemCarbsInput: '#item-carbs-input',
    itemFatInput: '#item-fat-input'
  }


  // public methods
  return {
    populateItemList: function (items) {
      let html = ''
      items.forEach(function (item) {
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
        document.querySelector(UISelectors.itemList).innerHTML = html
      })
    },
    getSelectors: function () {
      return UISelectors
    },
    getItemInput: function () {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        price: document.querySelector(UISelectors.itemPriceInput).value,
        brand: document.querySelector(UISelectors.itemBrandInput).value,
        source: document.querySelector(UISelectors.itemSourceInput).value,
        amount: document.querySelector(UISelectors.itemAmountInput).value,
        protein: document.querySelector(UISelectors.itemProteinInput).value,
        fat: document.querySelector(UISelectors.itemFatInput).value,
        carbs: document.querySelector(UISelectors.itemCarbsInput).value,
        servingSize: document.querySelector(UISelectors.itemServingSizeInput).value
      }
    },
    addItemToUI: function (item) {
      // create new element so we can later addAdjacentElement
      const tr = document.createElement('tr')
      tr.className = 'food-item'
      tr.id = `item-${item.id}`
      tr.innerHTML = `
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
      `
      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', tr)
    },
    clearInputFields: function () {
      document.querySelector(UISelectors.itemNameInput).value = '',
        document.querySelector(UISelectors.itemPriceInput).value = '',
        document.querySelector(UISelectors.itemBrandInput).value = '',
        document.querySelector(UISelectors.itemSourceInput).value = '',
        document.querySelector(UISelectors.itemAmountInput).value = '',
        document.querySelector(UISelectors.itemProteinInput).value = '',
        document.querySelector(UISelectors.itemFatInput).value = '',
        document.querySelector(UISelectors.itemCarbsInput).value = '',
        document.querySelector(UISelectors.itemServingSizeInput).value = ''
    }
  }

})()

// ===============================================================
// ===============================================================
// APP CONTROLLER
// ===============================================================
// ===============================================================

const App = (function (ItemCtrl, UICtrl, StorageCtrl) {
  // add a grocery item: this is an event. 
  // create "load event listeners" function to centralize this, similar
  // to setting UISelectors collection for scalability
  const loadEventListeners = function () {
    const UISelectors = UICtrl.getSelectors()

    // Add item event
    document.querySelector(UISelectors.addItem).addEventListener('click', itemAddSubmit)
  }

  // Add item submit
  const itemAddSubmit = function (e) {
    // get form input from UIController
    const input = UICtrl.getItemInput()

    // check that input fields are not empty
    if (
      input.name !== '' &&
      input.price !== '' &&
      input.brand !== '' &&
      input.source !== '' &&
      input.amount !== '' &&
      input.protein !== '' &&
      input.fat !== '' &&
      input.carbs !== '' &&
      input.servingSize !== '') {
      console.log(input)
      // add item to UI
      const newItem = ItemCtrl.addItem(
        input.name,
        input.price,
        input.brand,
        input.source,
        input.amount,
        input.protein,
        input.fat,
        input.carbs,
        input.servingSize
      )

      UICtrl.addItemToUI(newItem)

      // clear input fields
      UICtrl.clearInputFields()


    } else {
      console.log('error: all fields required')
    }

    // check if input fields have data
    e.preventDefault();

  }


  // public methods
  return {
    init: function () {
      // console.log('Init app')

      // fetch items from data store
      const items = ItemCtrl.getItems()
      const newItems = ItemCtrl.calculateNewItems(items)

      // populate table with item data
      UICtrl.populateItemList(newItems)
      loadEventListeners()
    }
  }

})(ItemCtrl, UICtrl, StorageCtrl)

App.init()
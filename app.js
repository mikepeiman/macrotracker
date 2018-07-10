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
  // console.log('storage controller active')

  // public methods
  return {
    storeItem: function() {
      
    },
    updateItem: function() {

    },
    deleteItem: function() {

    }
  }
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
      }
    ],
    currentItem: null, // this is intended for updates
    totalProteinSum: 0,
    totalFatSum: 0,
    totalCarbsSum: 0,
    totalCaloriesSum: 0,
    totalCostSum: 0,
    totalMealsSum: 0,
    avgCostPerMeal: 0,
    avgPricePerFat: 0,
    avgPricePerCarb: 0,
    avgPricePerProtein: 0,
    avgPricePerCalorie: 0,
    proteinPerMeal: 35,
    mealsByProtein: 0,
    caloriesPerMeal: 800,
    mealsByCalories: 0
  }

  // public methods
  return {
    getItems: function () {
      return data.items
    },
    getData: function () {
      const totals = ItemCtrl.getTotals()
      const mealsCalc = ItemCtrl.calculateMeals(totals)
      return data
    },
    calculateNewItems: function () {
      // console.log(data.items)
      const newItems = []
      data.items.forEach(function (item) {
        let newItem = new Item(item.id, item.name, item.price, item.brand, item.source, item.amount, item.protein, item.fat, item.carbs, item.servingSize)
        // console.log(`New item: ${newItem.name}`)
        newItems.push(newItem)
      })
      return newItems
    },
    addItem: function (hasID, name, price, brand, source, amount, protein, fat, carbs, servingSize) {
      let ID
      console.log(`1.New ID: ${ID}, hasID: ${hasID}`)
      // create unique ID per item

      if (hasID === null) {

        console.log('ID === null')

        if (data.items.length > 0) {
          console.log(`data.items.length: ${data.items.length}`)
          // const ID = data.items[data.items.length - 1].id + 1
          ID = data.items.length
          // Length of items collection (eg 3 items)
          // Access the last item through array indexing (hence the '- 1')
          // Access the value of that item's ID property ('.id')
          // Add one more to create the next unique ID in sequence
          console.log(`after setting ID: ${ID}`)
        }
        // else {
        //   ID = 0
        // }
      } else {
        ID = hasID
      }
      console.log(`2.New ID: ${ID}, hasID: ${hasID}`)

      // Create new item
      let newItem = new Item(ID, name, price, brand, source, amount, protein, fat, carbs, servingSize)
      console.log(`New item: ${newItem}`)
      // add to data items collection
      data.items.push(newItem)
      // return the item so we can pass it to UI controller
      return newItem
    },
    getTotals: function () {
      let totalFatSum = 0
      let totalCarbsSum = 0
      let totalProteinSum = 0
      let totalCaloriesSum = 0
      let totalCostSum = 0

      // fetch items from data store
      const items = ItemCtrl.getItems()
      // expand items with additional computed properties
      const newItems = ItemCtrl.calculateNewItems(items)

      // loop through items and calculate values
      newItems.forEach(function (item) {
        totalProteinSum += item.totalProtein
        totalFatSum += item.totalFat
        totalCarbsSum += item.totalCarbs
        totalCaloriesSum += item.totalCalories
        totalCostSum += item.price
      })

      totalFatSum = totalFatSum.toFixed(2)
      totalCarbsSum - totalCarbsSum.toFixed(2)
      totalCaloriesSum = totalCaloriesSum.toFixed(2)
      totalProteinSum = totalProteinSum.toFixed(2)
      // set totals values in data set
      data.totalProteinSum = totalProteinSum
      data.totalFatSum = totalFatSum
      data.totalCarbsSum = totalCarbsSum
      data.totalCaloriesSum = totalCaloriesSum
      data.totalCostSum = totalCostSum

      return {
        totalProteinSum,
        totalFatSum,
        totalCarbsSum,
        totalCaloriesSum,
        totalCostSum
      }
    },
    calculateMeals: function (totals) {

      let avgCostPerMeal = (totals.totalCostSum / data.totalMealsSum).toFixed(2)
      let avgPricePerCalorie = (totals.totalCostSum / totals.totalCaloriesSum).toFixed(2)
      let avgPricePerCarb = (totals.totalCostSum / totals.totalCarbsSum).toFixed(2)
      let avgPricePerFat = (totals.totalCostSum / totals.totalFatSum).toFixed(2)
      let avgPricePerProtein = (totals.totalCostSum / totals.totalProteinSum).toFixed(2)

      data.avgCostPerMeal = avgCostPerMeal,
        data.avgPricePerCalorie = avgPricePerCalorie,
        data.avgPricePerCarb = avgPricePerCarb,
        data.avgPricePerFat = avgPricePerFat,
        data.avgPricePerProtein = avgPricePerProtein

      return {
        avgCostPerMeal,
        avgPricePerCalorie,
        avgPricePerCarb,
        avgPricePerFat,
        avgPricePerProtein
      }
    },
    getItemById: function (id) {
      let found = null
      // loop through items
      data.items.forEach(function (item) {
        if (item.id === id) {
          found = item
        }
      })
      return found
    },
    setCurrentItem: function (itemToEdit) {
      data.currentItem = itemToEdit
    },
    getCurrentItem: function () {
      return data.currentItem
    },
    updateItem: function (
      name,
      price,
      brand,
      source,
      amount,
      protein,
      fat,
      carbs,
      servingSize
    ) {

      // once I add all the variables,
      // convert number values to number via parseInt()

      let found = null
      data.items.forEach(function (item) {
        if (item.id === data.currentItem.id) {
          item.name = name
          item.price = price,
            item.brand = brand,
            item.source = source,
            item.amount = amount,
            item.protein = protein,
            item.fat = fat,
            item.carbs = carbs,
            item.servingSize = servingSize
          found = item
        }
      })
      return found
    },
    deleteItem: function (id) {
      ids = data.items.map(function (item) {
        return item.id
      })

      // get index
      const index = ids.indexOf(id)

      // delete from array via splice()
      data.items.splice(index, 1)

      UICtrl.clearEditState()
    },
    clearAllItemsData: function() {
      data.items = []
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
    itemTable: '#items-table',
    tableItems: 'tr',
    addItemButton: '#add-item-button',
    updateItemButton: '#update-item-button',
    deleteItemButton: '#delete-item-button',
    backButton: '#back-button',
    clearAllButton: '#clear-all-button',
    calculateMealsBy: '#calculate-meals-by',
    calculateMealsByCalories: '#calculate-meals-by-calories',
    calculateMealsByProtein: '#calculate-meals-by-protein',
    mealsByProteinButton: '#set-protein-per-meal-button',
    mealsByCaloriesButton: '#set-calories-per-meal-button',
    mealsByCaloriesForm: '#meals-by-calories-form',
    mealsByProteinForm: '#meals-by-protein-form',
    caloriesRadio: '#calories-radio',
    proteinRadio: '#protein-radio',
    itemNameInput: '#item-name-input',
    itemBrandInput: '#item-brand-input',
    itemSourceInput: '#item-source-input',
    itemPriceInput: '#item-price-input',
    itemAmountInput: '#item-amount-input',
    itemServingSizeInput: '#item-serving-size-input',
    itemProteinInput: '#item-protein-input',
    itemCarbsInput: '#item-carbs-input',
    itemFatInput: '#item-fat-input',
    UITotalFat: '#li-total-fat',
    UITotalCarbs: '#li-total-carbs',
    UITotalProtein: '#li-total-protein',
    UITotalCalories: '#li-total-calories',
    UITotalMeals: '#li-total-meals',
    UICostPerMeal: '#li-cost-per-meal',
    UIPricePerFatAvg: '#li-price-per-fat-avg',
    UIPricePerCarbAvg: '#li-price-per-carb-avg',
    UIPricePerProteinAvg: '#li-price-per-protein-avg',
    UIPricePerCalorieAvg: '#li-price-per-calorie-avg',
    UITotalCost: '#li-total-cost'
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
          <a href="#">
            <i class="edit-item fa fa-pencil"></i>
          </a>
        </td>
      </tr>
          `

        // insert list items
        document.querySelector(UISelectors.itemList).innerHTML = html
      })
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
      <a href="#">
      <i class="edit-item fa fa-pencil"></i>
    </a>
      </td>
      `
      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', tr)
    },
    updateItemUI: function (item) {
      let tableItems = document.querySelectorAll(UISelectors.tableItems)

      // turn nodelist into array
      tableItems = Array.from(tableItems)

      tableItems.forEach(function (tableItem) {
        const itemID = tableItem.getAttribute('id')
        // console.log(tableItem, itemID, tableItem.id)
        if (itemID === `item-${item.id}`) {
          let thisItem = document.querySelector(`#${itemID}`)
          // console.log(`this item matches: ${thisItem}`)
          // console.log(item.name, item.price)

          markup = `
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
      <a href="#">
      <i class="edit-item fa fa-pencil"></i>
    </a>
      </td>`

          thisItem.innerHTML = markup
        }

      })
    },
    deleteItemFromUI: function (id) {
      const itemID = `#item-${id}`
      const item = document.querySelector(itemID)
      item.remove()
    },
    clearAllItemsUI: function() {
      let UISelectors = UICtrl.getSelectors()
      document.querySelector(UISelectors.itemList).innerHTML = ''
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
    },
    addItemToForm: function () {
      currentItem = ItemCtrl.getCurrentItem()
      console.log(`addItemToForm: current item: ${currentItem.name}`)
      document.querySelector(UISelectors.itemNameInput).value = currentItem.name,
        document.querySelector(UISelectors.itemPriceInput).value = currentItem.price,
        document.querySelector(UISelectors.itemBrandInput).value = currentItem.brand,
        document.querySelector(UISelectors.itemSourceInput).value = currentItem.source,
        document.querySelector(UISelectors.itemAmountInput).value = currentItem.amount,
        document.querySelector(UISelectors.itemProteinInput).value = currentItem.protein,
        document.querySelector(UISelectors.itemFatInput).value = currentItem.fat,
        document.querySelector(UISelectors.itemCarbsInput).value = currentItem.carbs,
        document.querySelector(UISelectors.itemServingSizeInput).value = currentItem.servingSize
      UICtrl.showEditState()
    },
    hideTable: function () {
      document.querySelector(UISelectors.itemTable).style.display = 'none'
    },
    showTable: function () {
      document.querySelector(UISelectors.itemTable).style.display = 'table'
    },
    showMealsByCalories: function () {
      document.querySelector(UISelectors.mealsByCaloriesForm).style.display = 'block'
      document.querySelector(UISelectors.mealsByProteinForm).style.display = 'none'
      document.querySelector(UISelectors.proteinRadio).checked = false
      document.querySelector(UISelectors.caloriesRadio).checked = true
    },
    showMealsByProtein: function () {
      document.querySelector(UISelectors.mealsByProteinForm).style.display = 'block'
      document.querySelector(UISelectors.mealsByCaloriesForm).style.display = 'none'
      document.querySelector(UISelectors.caloriesRadio).checked = false
      document.querySelector(UISelectors.proteinRadio).checked = true
    },
    proteinPerMeal: function () {
      let input = document.querySelector(UISelectors.calculateMealsByProtein)
      let data = ItemCtrl.getData()
      let ppm = parseInt(data.proteinPerMeal)
      let tms
      // console.log(`tms: ${tms}`)

      if (input.value !== '') {
        data.proteinPerMeal = input.value
        data.totalMealsSum = (data.totalProteinSum / data.proteinPerMeal).toFixed(2)
        document.querySelector(UISelectors.mealsByProteinButton).textContent = `${input.value} grams/meal`
        setTimeout(() => {
          input.value = ''
        }, 1250);
      }

      totalMealsSum = (data.totalProteinSum / data.proteinPerMeal).toFixed(2)
      avgCostPerMeal = (data.totalCostSum / totalMealsSum).toFixed(2)
      document.querySelector(UISelectors.UITotalMeals).textContent = totalMealsSum
      document.querySelector(UISelectors.UICostPerMeal).textContent = `$${avgCostPerMeal}`
      tms = totalMealsSum
      cpm = avgCostPerMeal
      data.totalMealsSum = totalMealsSum
      data.avgCostPerMeal = avgCostPerMeal

      return {
        ppm,
        tms,
        cpm
      }
      this.showTotals()
    },
    caloriesPerMeal: function () {
      let input = document.querySelector(UISelectors.calculateMealsByCalories)
      let data = ItemCtrl.getData()

      if (input.value !== '') {
        document.querySelector(UISelectors.mealsByProteinButton).textContent = `${input.value} grams/meal`
        setTimeout(() => {
          data.caloriesPerMeal = input.value
          input.value = ''
        }, 1250);
      } else (
        data.caloriesPerMeal = 800
      )
    },
    showTotals: function (totals, mealsCalc, ppm) {
      const data = ItemCtrl.getData()

      document.querySelector(UISelectors.UITotalProtein).textContent = totals.totalProteinSum
      document.querySelector(UISelectors.UITotalFat).textContent = totals.totalFatSum
      document.querySelector(UISelectors.UITotalCarbs).textContent = totals.totalCarbsSum
      document.querySelector(UISelectors.UITotalCalories).textContent = totals.totalCaloriesSum
      document.querySelector(UISelectors.UICostPerMeal).textContent = `$${data.avgCostPerMeal}`
      document.querySelector(UISelectors.UIPricePerProteinAvg).textContent = `$${data.avgPricePerProtein}`
      document.querySelector(UISelectors.UIPricePerCarbAvg).textContent = `$${data.avgPricePerCarb}`
      document.querySelector(UISelectors.UIPricePerFatAvg).textContent = `$${data.avgPricePerFat}`
      document.querySelector(UISelectors.UIPricePerCalorieAvg).textContent = `$${data.avgPricePerCalorie}`
      document.querySelector(UISelectors.UITotalCost).textContent = `$${totals.totalCostSum}`
    },
    getSelectors: function () {
      return UISelectors
    },
    clearEditState: function () {
      UICtrl.clearInputFields()
      document.querySelector(UISelectors.updateItemButton).style.display = 'none'
      document.querySelector(UISelectors.deleteItemButton).style.display = 'none'
      document.querySelector(UISelectors.backButton).style.display = 'none'
      document.querySelector(UISelectors.addItemButton).style.display = 'inline'
    },
    showEditState: function () {
      document.querySelector(UISelectors.updateItemButton).style.display = 'inline'
      document.querySelector(UISelectors.deleteItemButton).style.display = 'inline'
      document.querySelector(UISelectors.backButton).style.display = 'inline'
      document.querySelector(UISelectors.addItemButton).style.display = 'none'
    }
  }
}
)()

// ===============================================================
// ===============================================================
// APP CONTROLLER
// ===============================================================
// ===============================================================

const App = (function (ItemCtrl, StorageCtrl, UICtrl) {
  // add a grocery item: this is an event. 
  // create "load event listeners" function to centralize this, similar
  // to setting UISelectors collection for scalability
  const loadEventListeners = function () {
    const UISelectors = UICtrl.getSelectors()

    // Add item event
    document.querySelector(UISelectors.addItemButton).addEventListener('click', itemAddSubmit)

    // disable <enter> keypress
    document.addEventListener('keypress', function (e) {
      if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault()
        return false
      }
    })

    // set event listener for "Show meals by" radio select
    document.querySelector(UISelectors.proteinRadio).addEventListener('click', function () {
      UICtrl.showMealsByProtein()
    })
    document.querySelector(UISelectors.caloriesRadio).addEventListener('click', function () {
      UICtrl.showMealsByCalories()
    })
    document.querySelector(UISelectors.mealsByProteinButton).addEventListener('click', function () {
      UICtrl.proteinPerMeal()
    })
    document.querySelector(UISelectors.mealsByCaloriesButton).addEventListener('click', function () {
      UICtrl.caloriesPerMeal()
    })
    document.querySelector(UISelectors.calculateMealsByProtein).addEventListener('keyup', function () {
      UICtrl.proteinPerMeal()
    })
    document.querySelector(UISelectors.calculateMealsByCalories).addEventListener('keyup', function () {
      UICtrl.caloriesPerMeal()
    })

    // edit icon click event
    document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick)

    // update item submit event
    document.querySelector(UISelectors.updateItemButton).addEventListener('click', editItemUpdateSubmit)

    // back button, clear fields
    document.querySelector(UISelectors.backButton).addEventListener('click', UICtrl.clearEditState)

    // delete button
    document.querySelector(UISelectors.deleteItemButton).addEventListener('click', itemDeleteSubmit)

    // delete button
    document.querySelector(UISelectors.clearAllButton).addEventListener('click', clearAllItems)
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
        null,
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
      UICtrl.showTable()

      // clear input fields
      UICtrl.clearInputFields()


    } else {
      console.log('error: all fields required')
    }

    e.preventDefault();

  }

  const itemEditClick = function (e) {
    if (e.target.classList.contains('edit-item')) {
      // console.log('e.target edit-item success!')
      // Get list item ID
      const listID = e.target.parentNode.parentNode.parentNode.id
      const item = e.target.parentNode.parentNode.parentNode
      console.log(e.target, listID, item)
      // console.log(e.target.childNode.classList.contains('edit-item'))

      // split list-id string so we can get ID
      const idSplit = listID.split('-')
      // console.log(idSplit[1])

      // get actual ID
      const id = parseInt(idSplit[1])

      // get item
      const itemToEdit = ItemCtrl.getItemById(id)
      // console.log(itemToEdit)

      // set current item
      ItemCtrl.setCurrentItem(itemToEdit)

      // trigger edit state in table
      UICtrl.addItemToForm()
    }
    e.preventDefault
  }

  const editItemUpdateSubmit = function (e) {

    // get item input
    const input = UICtrl.getItemInput()

    // update item
    const updatedItem = ItemCtrl.updateItem(
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
    const data = ItemCtrl.getData()
    const currentID = data.currentItem.id

    const newItem = ItemCtrl.addItem(currentID,
      updatedItem.name,
      updatedItem.price,
      updatedItem.brand,
      updatedItem.source,
      updatedItem.amount,
      updatedItem.protein,
      updatedItem.fat,
      updatedItem.carbs,
      updatedItem.servingSize)
    // a little refresher on basic functional logic:
    // here's my variable <updatedItem>
    // run this function  ItemCtrl.updateItem()
    // feed it this data (argument): ItemCtrl.updateItem(input.name)
    // assign the value this returns to my variable

    // update UI
    UICtrl.updateItemUI(newItem)
    UICtrl.clearEditState()

    e.preventDefault()
  }

  const itemDeleteSubmit = function (e) {
    // get current item by ID
    const currentItem = ItemCtrl.getCurrentItem()

    // delete from data structure
    ItemCtrl.deleteItem(currentItem.id)

    // delete from UI
    UICtrl.deleteItemFromUI(currentItem.id)

    // get all totals
    const totals = ItemCtrl.getTotals()
    const mealsCalc = ItemCtrl.calculateMeals(totals)
    // add all totals to UI
    UICtrl.proteinPerMeal()
    UICtrl.showTotals(totals, mealsCalc)
    e.preventDefault()
  }

  const clearAllItems = function (e) {
    // delete all items from data structure
    ItemCtrl.clearAllItemsData()

    // delete all items from UI table
    UICtrl.clearAllItemsUI()
    UICtrl.clearEditState()
    UICtrl.hideTable()
    e.preventDefault()
  }

  // public methods
  return {
    init: function () {
      // set initial buttonstate
      UICtrl.clearEditState()
      // hide the "calculate meals by calories" form as "by protein" is checked by default
      UICtrl.showMealsByProtein()
      // fetch items from data store
      const items = ItemCtrl.getItems()
      // expand items with additional computed properties
      const newItems = ItemCtrl.calculateNewItems(items)

      // check if any items
      if (items.length === 0) {
        UICtrl.hideTable()
      } else {
        // populate table with item data
        UICtrl.populateItemList(newItems)
      }

      // get all totals
      const totals = ItemCtrl.getTotals()
      const mealsCalc = ItemCtrl.calculateMeals(totals)
      // add all totals to UI
      UICtrl.proteinPerMeal()
      UICtrl.showTotals(totals, mealsCalc)


      // load event listeners
      loadEventListeners()
    }
  }

})(ItemCtrl, StorageCtrl, UICtrl)

App.init()
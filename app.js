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
    // this.totalFatSum = 0
    // this.totalCarbsSum = 0
    // this.totalProteinSum = 0
    // this.totalCaloriesSum = 0
    // this.totalMealsSum = 0
    // // this.caloriesPerMeal = 800
    // // this.proteinPerMeal = 35
    // this.avgCostPerMeal = 0
    // this.avgPricePerFat = 0
    // this.avgPricePerCarb = 0
    // this.avgPricePerProtein = 0
    // this.avgPricePerCalorie = 0
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
    addItem: function (name, price, brand, source, amount, protein, fat, carbs, servingSize) {
      // console.log(name, price, brand, source, amount, protein, fat, carbs, servingSize)

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
      console.log(`New item: ${newItem}`)
      // add to data items collection
      data.items.push(newItem)
      // return the item so we can pass it to UI controller
      return newItem
    },
    calculateTotals: function() {
      // this will be my new approach to calculating totals and averages.
      // cut them from the getTotals() method and put them here, and call this
      // method, followed by another new method to output these computed value
      // to the UI



    },
    getTotals: function () {
      let totalFatSum = 0
      let totalCarbsSum = 0
      let totalProteinSum = 0
      let totalCaloriesSum = 0
      let totalCostSum = 0
      
      // let caloriesPerMeal = 890
      // let proteinPerMeal = (UICtrl.proteinPerMeal() !== 0) ? UICtrl.proteinPerMeal() : 10
      // let totalMealsSum = totalProteinSum / proteinPerMeal//(totalProteinSum / proteinPerMeal).toFixed(2) 
      // let avgCostPerMeal = 0
      // let avgPricePerFat = 0
      // let avgPricePerCarb = 0
      // let avgPricePerProtein = 0
      // let avgPricePerCalorie = 0

      // fetch items from data store
      const items = ItemCtrl.getItems()
      // expand items with additional computed properties
      const newItems = ItemCtrl.calculateNewItems(items)

      // let proteinInput = document.querySelector('#calculate-meals-by-protein')
      // let caloriesInput = document.querySelector('#calculate-meals-by-calories')
      // let proteinRadio = document.querySelector('#protein-radio')
      // let caloriesRadio = document.querySelector('#calories-radio')


      // loop through items and calculate values
      newItems.forEach(function (item) {

        totalProteinSum += item.totalProtein
        totalFatSum += item.totalFat
        totalCarbsSum += item.totalCarbs
        totalCaloriesSum += item.totalCalories
        totalCostSum += item.price
        // proteinPerMeal = 1//(UICtrl.proteinPerMeal() !== 0) ? UICtrl.proteinPerMeal() : 30
        // another way to do totalMealsSum is to calculate total meals per item and sum it in this loop

        // totalMealsSum = (totalProteinSum / proteinPerMeal).toFixed(2)  
        // totalMealsSum = totalProteinSum / data.proteinPerMeal
        // console.log(`Protein per meal: ${proteinPerMeal}, total protein across items: ${totalProteinSum}`)
        // avgCostPerMeal = 10
        // avgPricePerFat = 5
        // avgPricePerCarb = 6
        // avgPricePerProtein = 7
        // avgPricePerCalorie = 8
        // if (proteinRadio.checked) {
        //   totalMealsSum = totalProteinSum / proteinPerMeal
        //   console.log(`Total meals sum, proteinRadio: ${totalMealsSum}`)
        // } else if(caloriesRadio.checked) {
        //   totalMealsSum = totalCaloriesSum / caloriesPerMeal
        //   console.log(`Total meals sum, caloriesRadio: ${totalMealsSum}`)
        // }
      })
      // set totals values in data set
      
      // data.proteinPerMeal = totalProteinSum / proteinPerMeal // (UICtrl.proteinPerMeal() !== 0) ? UICtrl.proteinPerMeal() : 30
      data.totalProteinSum = totalProteinSum
      data.totalFatSum = totalFatSum
      data.totalCarbsSum = totalCarbsSum
      data.totalCaloriesSum = totalCaloriesSum
      // data.proteinPerMeal = proteinPerMeal
      // data.caloriesPerMeal = caloriesPerMeal
      // data.totalMealsSum = totalMealsSum
      // data.totalMealsSum = totalProteinSum / proteinPerMeal
      // data.totalMealsSum = totalCaloriesSum / caloriesPerMeal
      // data.avgCostPerMeal = avgCostPerMeal
      // data.avgPricePerFat = avgPricePerFat
      // data.avgPricePerCarb = avgPricePerCarb
      // data.avgPricePerProtein = avgPricePerProtein
      // data.avgPricePerCalorie = avgPricePerCalorie


      return {
        totalProteinSum,
        totalFatSum,
        totalCarbsSum,
        totalCaloriesSum,
        // avgPricePerFat,
        // avgPricePerCarb,
        // avgPricePerProtein,
        // avgPricePerCalorie,
        // proteinPerMeal,
        // caloriesPerMeal,
        totalCostSum
      }
    },
    calculateMeals: function(totals) {
      // const totals = ItemCtrl.getTotals()
      let proteinPerMeal = (UICtrl.proteinPerMeal() !== 0) ? UICtrl.proteinPerMeal() : 30
      let totalMealsSum = (totals.totalProteinSum / proteinPerMeal).toFixed(2)
      let avgCostPerMeal = (totals.totalCostSum / totalMealsSum).toFixed(2)
      let avgPricePerCalorie = (totals.totalCostSum / totals.totalCaloriesSum).toFixed(2)
      let avgPricePerCarb = (totals.totalCostSum / totals.totalCarbsSum).toFixed(2)
      let avgPricePerFat = (totals.totalCostSum / totals.totalFatSum).toFixed(2)
      let avgPricePerProtein = (totals.totalCostSum / totals.totalProteinSum).toFixed(2)


      data.totalMealsSum = totalMealsSum,
      data.avgCostPerMeal = avgCostPerMeal,
      data.avgPricePerCalorie =avgPricePerCalorie,
      data.avgPricePerCarb = avgPricePerCarb,
      data.avgPricePerFat = avgPricePerFat,
      data.avgPricePerProtein = avgPricePerProtein
      return {
        totalMealsSum,
        avgCostPerMeal,
        avgPricePerCalorie,
        avgPricePerCarb,
        avgPricePerFat,
        avgPricePerProtein
      }
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
    addItem: '#add-item-button',
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
      // let mealCalc = ItemCtrl.calculateMeals()
     
      
      if (input.value !== '') {
        document.querySelector(UISelectors.mealsByProteinButton).textContent = `${input.value} grams/meal`
        setTimeout(() => {
          data.proteinPerMeal = input.value
          console.log(`proteinPerMeal(): Protein input: ${input.value}, data.proteinPerMeal: ${data.proteinPerMeal}`)
          console.log(`data.totalProteinSum: ${data.totalProteinSum}, data.totalMealsSum: ${(data.totalProteinSum / data.proteinPerMeal).toFixed(2)}`)// 
          // data.totalMealsSum = data.totalProteinSum / data.proteinPerMeal
          // const totals = ItemCtrl.getTotals()

          // add all totals to UI
          // UICtrl.showTotals(totals)
          input.value = ''
        }, 1250);
        
      } 
      data.totalMealsSum = (data.totalProteinSum / data.proteinPerMeal).toFixed(2)

      return parseInt(data.proteinPerMeal)
      // data.totalMealsSum = data.totalProteinSum / data.proteinPerMeal
      // else {
      //   data.proteinPerMeal = 30
      // }
      // return 5 //(data.proteinPerMeal !== 0) ? data.proteinPerMeal : 50
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
    // showTotals: function (totals) {
    //   console.log(totals)
    // },
    showTotals: function (totals) {
      const data = ItemCtrl.getData()
      // console.log(totals)
      document.querySelector(UISelectors.UITotalProtein).textContent = totals.totalProteinSum
      document.querySelector(UISelectors.UITotalFat).textContent = totals.totalFatSum
      document.querySelector(UISelectors.UITotalCarbs).textContent = totals.totalCarbsSum
      document.querySelector(UISelectors.UITotalMeals).textContent = data.totalMealsSum
      document.querySelector(UISelectors.UITotalCalories).textContent = totals.totalCaloriesSum
      document.querySelector(UISelectors.UICostPerMeal).textContent = `$${data.avgCostPerMeal}`
      document.querySelector(UISelectors.UIPricePerProteinAvg).textContent = `$${data.avgPricePerProtein}`
      document.querySelector(UISelectors.UIPricePerCarbAvg).textContent = `$${data.avgPricePerCarb}`
      document.querySelector(UISelectors.UIPricePerFatAvg).textContent = `$${data.avgPricePerFat}`
      document.querySelector(UISelectors.UIPricePerCalorieAvg).textContent = `$${data.avgPricePerCalorie}`
      document.querySelector(UISelectors.UITotalCost).textContent = `$${totals.totalCostSum}`
      // console.log(`
      // total meals: ${data.totalMealsSum} 
      // avg meal cost: ${data.avgCostPerMeal} 
      // $/cal: ${data.avgPricePerCalorie} 
      // $/carb: ${data.avgPricePerCarb} 
      // $/fat: ${data.avgPricePerFat} 
      // $/protein: ${data.avgPricePerProtein}
      // `)
    },
    getSelectors: function () {
      return UISelectors
    }
  }
}
)()

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
      UICtrl.showTable()

      // clear input fields
      UICtrl.clearInputFields()


    } else {
      console.log('error: all fields required')
    }

    e.preventDefault();

  }
  // get all totals
  const totals = ItemCtrl.getTotals()
  ItemCtrl.calculateMeals(totals)
  UICtrl.proteinPerMeal()
  // add all totals to UI
  UICtrl.showTotals(totals)


  // public methods
  return {
    init: function () {
      // console.log('Init app')

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


      // hide the "calculate meals by calories" form as "by protein" is checked by default
      UICtrl.showMealsByProtein()

      // load event listeners
      loadEventListeners()
    }
  }

})(ItemCtrl, UICtrl, StorageCtrl)

App.init()
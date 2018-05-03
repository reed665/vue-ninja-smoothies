<template>
  <div class="add-smoothie container">
    <h2 class="center-align indigo-text">Add New Smoothie Recipe</h2>

    <form @submit.prevent="addSmoothie">
      <div class="field title">
        <label for="title">Smoothie Title</label>
        <input type="text" name="title" v-model="title">
      </div>

      <div v-for="(ingredient, idx) of ingredients" :key="idx">
        <label for="ingredient">Ingredient</label>
        <input type="text" name="ingredient" v-model="ingredients[idx]">
      </div>

      <div class="field add-ingredient">
        <label for="add-ingredient">Add an Ingredient</label>
        <input type="text" name="add-ingredient" @keydown.tab.prevent="addIngredient" v-model="another">
      </div>

      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn pink">Add Smoothie</button>
      </div>
    </form>
  </div>
</template>


<script>
export default {
  data () {
    return {
      title: '',
      another: '',
      ingredients: [],
      feedback: '',
    }
  },
  methods: {
    addIngredient () {
      if (!this.another) {
        this.feedback = 'You must enter a value to add an ingredient'
        return
      }
      this.feedback = ''
      this.ingredients.push(this.another)
      this.another = ''
    },
    addSmoothie () {
      console.log(this.title, this.ingredients)
    }
  }
}
</script>


<style scoped>
.add-smoothie {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
h2 {
  font-size: 2em;
  margin: 20px auto;
}
.field {
  margin: 20px auto;
}
</style>

<template>
  <div class="add-smoothie container">
    <h2 class="center-align indigo-text">Add New Smoothie Recipe</h2>

    <form @submit.prevent="addSmoothie">
      <div class="field title">
        <label for="title">Smoothie Title</label>
        <input type="text" name="title" v-model="title">
      </div>

      <div class="field" v-for="(ingredient, idx) of ingredients" :key="idx">
        <label for="ingredient">Ingredient</label>
        <input type="text" name="ingredient" v-model="ingredients[idx]">
        <i class="material-icons ingredient-delete" @click="deleteIngredient(ingredient)">delete</i>
      </div>

      <div class="field add-ingredient">
        <label for="add-ingredient">Add an Ingredient (press tab)</label>
        <input type="text" name="add-ingredient" @keydown.tab.prevent="addIngredient" v-model="another">
      </div>

      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn pink" :disabled="saving">Add Smoothie</button>
      </div>
    </form>
  </div>
</template>


<script>
import slugify from 'slugify'
import db from '@/firebase'

export default {
  data () {
    return {
      title: '',
      another: '',
      ingredients: [],
      feedback: '',
      saving: false,
    }
  },
  computed: {
    slug () {
      return slugify(this.title, { replacement: '-', remove: /[$*_+~.()'"!\-:@]/g, lower: true })
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
    deleteIngredient (ingredient) {
      this.ingredients = this.ingredients.filter(ing => ingredient !== ing)
    },
    addSmoothie () {
      if (!this.title) {
        this.feedback = "You must enter a smoothie title"
        return
      }
      if (!this.ingredients || !this.ingredients.length) {
        this.feedback = 'A smoothie should contain at least one ingredient'
        return
      }
      this.feedback = ''
      const doc = {
        title: this.title,
        slug: this.slug,
        ingredients: this.ingredients,
      }
      this.saving = true
      db.collection('smoothies').add(doc)
        .then(() => {
          this.saving = false
          this.$router.push({ name: 'index' })
        })
        .catch(err => {
          this.saving = false
          console.error(err)
        })
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
  position: relative;
}
.ingredient-delete {
  cursor: pointer;
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
}
</style>

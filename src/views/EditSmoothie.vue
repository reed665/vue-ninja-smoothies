<template>
  <div v-if="smoothie" class="edit-smoothie container">
    <h2 class="center-align indigo-text">Edit {{ smoothie.title }}</h2>

    <form @submit.prevent="editSmoothie">
      <div class="field title">
        <label for="title">Smoothie Title</label>
        <input type="text" name="title" v-model="smoothie.title">
      </div>

      <div class="field" v-for="(ingredient, idx) of smoothie.ingredients" :key="idx">
        <label for="ingredient">Ingredient</label>
        <input type="text" name="ingredient" v-model="smoothie.ingredients[idx]">
        <i class="material-icons ingredient-delete" @click="deleteIngredient(ingredient)">delete</i>
      </div>

      <div class="field add-ingredient">
        <label for="add-ingredient">Add an Ingredient (press tab)</label>
        <input type="text" name="add-ingredient" @keydown.tab.prevent="addIngredient" v-model="another">
      </div>

      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn pink">Update Smoothie</button>
      </div>
    </form>
  </div>

  <div v-else class="loading container">
    <preloader></preloader>
  </div>
</template>


<script>
import Preloader from '@/components/Preloader.vue'
import slugify from 'slugify'
import db from '@/firebase'

export default {
  components: { Preloader },
  data () {
    return {
      smoothie: null,
      another: '',
      feedback: '',
    }
  },
  computed: {
    routeSlug () {
      return this.$route.params.slug
    },
  },
  created () {
    db.collection('smoothies').where('slug', '==', this.routeSlug).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.smoothie = { id: doc.id, ...doc.data() }
        })
      })
      .catch(console.error)
  },
  methods: {
    editSmoothie () {
      if (!this.smoothie.title) {
        this.feedback = "You must enter a smoothie title"
        return
      }
      this.feedback = ''
      const { title, ingredients } = this.smoothie
      const doc = {
        title,
        slug: this.slug(title),
        ingredients,
      }
      db.collection('smoothies').doc(this.smoothie.id).update(doc)
        .then(() => {
          this.$router.push({ name: 'index' })
        })
        .catch(console.error)
    },
    addIngredient () {
      if (!this.another) {
        this.feedback = 'You must enter a value to add an ingredient'
        return
      }
      this.feedback = ''
      this.smoothie.ingredients.push(this.another)
      this.another = ''
    },
    deleteIngredient (ingredient) {
      this.smoothie.ingredients = this.smoothie.ingredients.filter(ing => ingredient !== ing)
    },
    slug (title) {
      return slugify(title, { replacement: '-', remove: /[$*_+~.()'"!\-:@]/g, lower: true })
    },
  }
}
</script>


<style scoped>
  .edit-smoothie {
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

  .loading {
    margin-top: 100px;
    text-align: center;
  }
</style>

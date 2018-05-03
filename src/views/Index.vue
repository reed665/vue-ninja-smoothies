<template>
  <div class="index container">
    <div class="card" v-for="smoothie of smoothies" :key="smoothie.id">
      <div class="card-content">
        <i class="material-icons delete-icon" @click="deleteSmoothie(smoothie.id)">delete</i>
        <h4 class="smoothie-title indigo-text">{{ smoothie.title }}</h4>
        <ul class="ingredient-list">
          <li class="ingredient" v-for="(ingredient, idx) of smoothie.ingredients" :key="idx">
            <span class="chip">{{ ingredient }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data () {
    return {
      smoothies: [
        {
          id: 1,
          title: 'Ninja Brew',
          slug: 'ninja-brew',
          ingredients: ['bananas', 'coffee', 'milk'],
        },
        {
          id: 2,
          title: 'Morning Mood',
          slug: 'morning-mood',
          ingredients: ['mango', 'lime', 'juice'],
        },
      ],
    }
  },
  methods: {
    deleteSmoothie (id) {
      this.smoothies = this.smoothies.filter(smoothie => smoothie.id !== id)
    }
  },
}
</script>


<style scoped>
  .index {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 30px;
    margin-top: 60px;
  }

  .smoothie-title {
    font-size: 1.8em;
    text-align: center;
    margin-top: 0;
  }

  .ingredient-list {
    margin: 30px auto;
  }

  .ingredient {
    display: inline-block;
  }

  .delete-icon {
    position: absolute;
    top: 4px;
    right: 4px;
    cursor: pointer;
    color: #aaa;
    font-size: 1.4em;
  }
</style>

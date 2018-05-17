<template>
  <div v-if="smoothies.length" class="index container">
    <div class="card smoothie-card" v-for="smoothie of smoothies" :key="smoothie.id">
      <div class="card-content">
        <i class="material-icons delete-icon" @click="deleteSmoothie(smoothie.id)">delete</i>

        <h4 class="smoothie-title indigo-text" :title="smoothie.title">
          {{ smoothie.title }}
        </h4>

        <ul class="ingredient-list">
          <li class="chip" v-for="(ingredient, idx) of smoothie.ingredients" :key="idx">
            <span class="ingredient">{{ ingredient }}</span>
          </li>
        </ul>
      </div>

      <router-link :to="{ name: 'editSmoothie', params: { slug: smoothie.slug } }">
        <span class="btn-floating btn-large halfway-fab pink">
          <i class="material-icons">edit</i>
        </span>
      </router-link>
    </div>
  </div>

  <div v-else class="loading container">
    <preloader></preloader>
  </div>
</template>


<script>
import Preloader from '@/components/Preloader'
import db from '@/firebase'

export default {
  components: { Preloader },
  data () {
    return {
      smoothies: [],
    }
  },
  methods: {
    deleteSmoothie (id) {
      db.collection('smoothies').doc(id).delete()
        .then(() => {
          this.smoothies = this.smoothies.filter(smoothie => smoothie.id !== id)
        })
        .catch(console.error)
    }
  },
  created () {
    db.collection('smoothies').get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          const smoothie = { id: doc.id, ...doc.data() }
          this.smoothies.push(smoothie)
        })
      })
      .catch(console.error)
  },
}
</script>


<style scoped>
  @media (min-width: 320px) {
    .index {
      grid-template-columns: 1fr;
    }
  }

  @media (min-width: 600px) {
    .index {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 900px) {
    .index {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .index {
    display: grid;
    grid-gap: 30px;
    margin-top: 60px;
    margin-bottom: 60px;
  }

  .smoothie-card {
    min-width: 0;
    min-height: 200px;
  }

  .smoothie-title {
    font-size: 1.8em;
    line-height: 1.35;
    text-align: center;
    margin-top: 0;
    overflow: hidden;
    text-overflow: ellipsis;
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

  .loading {
    margin-top: 100px;
    text-align: center;
  }

  .chip {
    max-width: 100%;
  }

  .ingredient {
    white-space: nowrap;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }

</style>

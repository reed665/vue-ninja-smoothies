<template>
  <div v-if="smoothie" class="edit-smoothie container">
    <h2>Edit {{ smoothie.title }}</h2>
  </div>

  <div v-else class="loading container">
    <preloader></preloader>
  </div>
</template>


<script>
import Preloader from '@/components/Preloader.vue'
import db from '@/firebase'

export default {
  components: { Preloader },
  data () {
    return {
      smoothie: null,
    }
  },
  computed: {
    slug () {
      return this.$route.params.slug
    }
  },
  created () {
    db.collection('smoothies').where('slug', '==', this.slug).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.smoothie = { id: doc.id, ...doc.data() }
        })
      })
      .catch(console.error)
  }
}
</script>


<style scoped>
  .loading {
    margin-top: 100px;
    text-align: center;
  }
</style>

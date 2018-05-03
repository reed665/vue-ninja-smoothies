<template>
  <div class="add-smoothie container">
    <h2 class="center-align indigo-text">Add New Smoothie Recipe</h2>

    <form @submit.prevent="addSmoothie">
      <div class="field title">
        <label for="title">Smoothie Title</label>
        <input type="text" name="title" v-model="title">
      </div>

      <div class="field add-ingredient">
        <label for="add-ingredient">Add an Ingredient</label>
        <input type="text" name="add-ingredient">
      </div>

      <div class="field center-align">
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
    }
  },
  methods: {
    addSmoothie () {
      console.log(this.title)
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

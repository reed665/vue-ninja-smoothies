<template>
  <div class="edit-smoothie container">
    <h2>Edit a Smoothie: {{ slug }}</h2>
  </div>
</template>


<script>
export default {
  computed: {
    slug () {
      return this.$route.params.slug
    }
  }
}
</script>

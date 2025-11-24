<template>
  <div>
    <h1>Recetas</h1>
    <router-link to="/create">
      <button>Crear Receta</button>
    </router-link>
    <ul>
      <li v-for="recipe in recipes" :key="recipe.id">
        <router-link :to="`/recipe/${recipe.id}`">{{ recipe.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { getRecipes } from "../services/api";

export default defineComponent({
  name: "RecipeList",
  setup() {
    const recipes = ref<any[]>([]);

    const fetchRecipes = async () => {
      try {
        const res = await getRecipes();
        recipes.value = res.data;
      } catch (err) {
        console.error(err);
      }
    };

    onMounted(fetchRecipes);

    return { recipes };
  },
});
</script>

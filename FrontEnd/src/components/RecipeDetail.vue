<template>
  <div v-if="recipe">
    <h1>{{ recipe.name }}</h1>
    <p><strong>Descripción:</strong> {{ recipe.description }}</p>
    <p><strong>Tiempo:</strong> {{ recipe.time_minutes }} minutos</p>
    <p><strong>Ingredientes:</strong></p>
    <ul>
      <li v-for="ing in recipe.ingredients" :key="ing.id">{{ ing.name }}</li>
    </ul>
    <router-link :to="`/edit/${recipe.id}`">
      <button>Editar</button>
    </router-link>
    <button @click="deleteRecipe">Eliminar</button>
    <router-link to="/">Volver</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { getRecipeById, deleteRecipe } from "../services/api";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "RecipeDetail",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const recipe = ref<any>(null);

    const fetchRecipe = async () => {
      try {
        const res = await getRecipeById(Number(route.params.id));
        recipe.value = res.data;
      } catch (err) {
        console.error(err);
      }
    };

    const deleteRecipeHandler = async () => {
      if (recipe.value) {
        await deleteRecipe(recipe.value.id);
        router.push("/");
      }
    };

    onMounted(fetchRecipe);

    return { recipe, deleteRecipe: deleteRecipeHandler };
  },
});
</script>

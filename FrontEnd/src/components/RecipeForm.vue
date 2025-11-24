<template>
  <div>
    <h1>{{ isEdit ? "Editar Receta" : "Crear Receta" }}</h1>
    <form @submit.prevent="handleSubmit">
      <div>
        <label>Nombre:</label>
        <input v-model="form.name" required />
      </div>
      <div>
        <label>Descripción:</label>
        <input v-model="form.description" />
      </div>
      <div>
        <label>Tiempo (min):</label>
        <input type="number" v-model.number="form.time_minutes" />
      </div>
      <div>
        <label>Ingredientes (separados por coma):</label>
        <input v-model="ingredientsInput" />
      </div>
      <button type="submit">{{ isEdit ? "Actualizar" : "Crear" }}</button>
      <router-link to="/">Cancelar</router-link>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { createRecipe, updateRecipe, getRecipeById } from "../services/api";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "RecipeForm",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const isEdit = ref<boolean>(!!route.params.id);

    const form = ref({
      name: "",
      description: "",
      time_minutes: 0,
      ingredients: [] as string[],
    });

    const ingredientsInput = ref("");

    const fetchRecipe = async () => {
      if (isEdit.value) {
        const res = await getRecipeById(Number(route.params.id));
        form.value = {
          name: res.data.name,
          description: res.data.description,
          time_minutes: res.data.time_minutes,
          ingredients: res.data.ingredients.map((i: any) => i.name),
        };
        ingredientsInput.value = form.value.ingredients.join(", ");
      }
    };

    const handleSubmit = async () => {
      form.value.ingredients = ingredientsInput.value.split(",").map(i => i.trim()).filter(Boolean);
      try {
        if (isEdit.value) {
          await updateRecipe(Number(route.params.id), form.value);
        } else {
          await createRecipe(form.value);
        }
        router.push("/");
      } catch (err) {
        console.error(err);
      }
    };

    onMounted(fetchRecipe);

    return { form, ingredientsInput, handleSubmit, isEdit };
  },
});
</script>

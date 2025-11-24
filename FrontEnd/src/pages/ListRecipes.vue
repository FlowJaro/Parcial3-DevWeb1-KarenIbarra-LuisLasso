<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getRecipes, deleteRecipe } from "../services/api";

const recipes = ref<any[]>([]);
const loading = ref(true);

async function loadRecipes() {
  try {
    loading.value = true;

    const res = await getRecipes();    // AxiosResponse
    recipes.value = res || [];

  } catch (e) {
    console.error("Error cargando recetas:", e);
    recipes.value = [];
  } finally {
    loading.value = false;
  }
}

async function remove(id: number) {
  if (!confirm("¿Seguro que deseas eliminar esta receta?")) return;

  try {
    const res = await deleteRecipe(id);

    // si backend devuelve { message: "Deleted" }
    if (res.message === "Deleted") {
      alert("Receta eliminada");
      await loadRecipes();
    } else {
      alert("Error al eliminar");
    }

  } catch (e) {
    alert("Error al eliminar");
    console.error(e);
  }
}

onMounted(() => {
  loadRecipes();
});
</script>

<template>
  <div class="container">
    <h1>Lista de Recetas</h1>

    <button @click="$router.push('/crear')" class="btn-create">➕ Crear Receta</button>

    <div v-if="loading">Cargando...</div>

    <table v-else class="recipes-table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Tiempo</th>
          <th>Ingredientes</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="r in recipes" :key="r.id">
          <td>{{ r.name }}</td>
          <td>{{ r.description }}</td>
          <td>{{ r.time_minutes }} min</td>

          <td>
            <span v-for="i in r.ingredients" :key="i.id">
              {{ i.name }}{{ r.ingredients.indexOf(i) < r.ingredients.length - 1 ? ', ' : '' }}
            </span>
          </td>

          <td>
            <button @click="$router.push('/recipe/' + r.id)">👁 Ver</button>
            <button @click="$router.push('/edit/' + r.id)">✏ Editar</button>
            <button @click="remove(r.id)" class="btn-delete">🗑 Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.container {
  padding: 20px;
}

.recipes-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.recipes-table th,
.recipes-table td {
  border: 1px solid #ccc;
  padding: 10px;
}

.btn-create {
  margin-bottom: 20px;
}

.btn-delete {
  color: red;
}
</style>

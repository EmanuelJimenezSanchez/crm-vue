<script setup>
  import ClienteService from '../services/ClienteService'
  import { FormKit } from '@formkit/vue';
  import { useRouter } from 'vue-router'
  import { collection, addDoc } from 'firebase/firestore'
  import { useFirestore } from 'vuefire'
  import RouterLink from '../components/UI/RouterLink.vue'
  import Heading from '../components/UI/Heading.vue'

  const router = useRouter()

  const db = useFirestore()

  defineProps({
    titulo: {
      type: String
    }
  })

  const handleSubmit = async (data) => {
    data.estado = 1
  //   ClienteService.agregarCliente(data)
  //     .then(respuesta => {
  //       // Redireccionar
  //       router.push({name : 'listado-clientes'})
  //     })
  //     .catch(error => console.log(error))
    const docRef = await addDoc(collection(db, "clientes"), data);

    if (docRef.id) {
      router.push({name : 'listado-clientes'})
    }
  }
</script>

<template>
  <div>
    <div class="flex justify-end">
      <RouterLink to="listado-clientes">
        Volver
      </RouterLink>
    </div>

    <Heading>{{ titulo }}</Heading>

    <div class="mx-auto mt-10 bg-white shadow">
      <div class="mx-auto md:w-2/3 py-20 px-6">
        <FormKit
          type="form"
          submit-label="Agregar Cliente"
          incomplete-message="Faltan campos por llenar"
          @submit="handleSubmit"
        >
          <FormKit 
            type="text"
            label="Nombre"
            name="nombre"
            placeholder="Nombre del cliente"
            validation="required"
            :validation-messages=" {required: 'El nombre del cliente es obligatorio'}"
          />

          <FormKit 
            type="text"
            label="Apellido"
            name="apellido"
            placeholder="Apellido del cliente"
            validation="required"
            :validation-messages=" {required: 'El apellido del cliente es obligatorio'}"
          />

          <FormKit 
            type="text"
            label="Email"
            name="email"
            placeholder="Email de cliente"
            validation="required|email"
            :validation-messages=" {required: 'El email del cliente es obligatorio', email: 'Coloca un email válido'}"
          />

          <FormKit 
            type="text"
            label="Teléfono"
            name="telefono"
            placeholder="XXX-XXX-XXXX"
            validation="*matches:/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/"
            :validation-messages=" {matches: 'El formato no es válido'}"
          />

          <FormKit 
            type="text"
            label="Empresa"
            name="empresa"
            placeholder="Empresa del cliente"
          />

          <FormKit 
            type="text"
            label="Puesto"
            name="puesto"
            placeholder="Puesto del cliente"
          />
        </FormKit>

      </div>
    </div>
  </div>
</template>

<style>
  .formkit-wrapper {
    max-width: 100%;
  }
</style>
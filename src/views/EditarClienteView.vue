<script setup>
  import { onMounted, reactive, watch } from 'vue'
  import ClienteService from '../services/ClienteService'
  import { FormKit } from '@formkit/vue'
  import { useRouter, useRoute } from 'vue-router'
  import RouterLink from '../components/UI/RouterLink.vue'
  import Heading from '../components/UI/Heading.vue'

  // Firebase
  import { useFirestore, useDocument } from 'vuefire'
  import { doc, updateDoc } from 'firebase/firestore'

  const router = useRouter()
  const route = useRoute()

  const { id } = route.params

  const formData = reactive({})

  // Firebase
  const db = useFirestore()
  const clienteRef = doc(db, 'clientes', id)
  const cliente = useDocument(clienteRef)

  watch(cliente, (cliente) => {
    Object.assign(formData, cliente)
  })

  // onMounted(() => {
  //   ClienteService.obtenerCliente(id)
  //     .then(({data}) => {
  //       Object.assign(formData, data)
  //     })
  //     .catch(error => console.log(error))
  // })

  defineProps({
    titulo: {
      type: String
    }
  })

  const handleSubmit = (data) => {
    // ClienteService.actualizarCliente(id, data)
    //   .then(respuesta => {
    //     // Redireccionar
    //     router.push({name : 'listado-clientes'})
    //   })
    //   .catch(error => console.log(error))

    updateDoc(clienteRef, data)
      .then(() => {
        router.push({name : 'listado-clientes'})
      })
      .catch(error => console.log(error))
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
          submit-label="Guardar Cambios"
          incomplete-message="Faltan campos por llenar"
          @submit="handleSubmit"
          :value="formData"
        >
          <FormKit 
            type="text"
            label="Nombre"
            name="nombre"
            placeholder="Nombre del cliente"
            validation="required"
            :validation-messages=" {required: 'El nombre del cliente es obligatorio'}"
            v-model="formData.nombre"
          />

          <FormKit 
            type="text"
            label="Apellido"
            name="apellido"
            placeholder="Apellido del cliente"
            validation="required"
            :validation-messages=" {required: 'El apellido del cliente es obligatorio'}"
            v-model="formData.apellido"
          />

          <FormKit 
            type="text"
            label="Email"
            name="email"
            placeholder="Email de cliente"
            validation="required|email"
            :validation-messages=" {required: 'El email del cliente es obligatorio', email: 'Coloca un email válido'}"
            v-model="formData.email"
          />

          <FormKit 
            type="text"
            label="Teléfono"
            name="telefono"
            placeholder="XXX-XXX-XXXX"
            validation="*matches:/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/"
            :validation-messages=" {matches: 'El formato no es válido'}"
            v-model="formData.telefono"
          />

          <FormKit 
            type="text"
            label="Empresa"
            name="empresa"
            placeholder="Empresa del cliente"
            v-model="formData.empresa"
          />

          <FormKit 
            type="text"
            label="Puesto"
            name="puesto"
            placeholder="Puesto del cliente"
            v-model="formData.puesto"
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
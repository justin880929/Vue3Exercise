<template>
  <div class="form-template">
    <form id="form" @submit.prevent="onSubmit">
      <div class="big-info">
        <span>個人資訊</span>
        <div class="label-input-template">
          <label for="name" :class="{ 'error': !isWrite.cusInfo.name.value }">Name:</label>
          <input id="name" type="text" name="name" v-model="formData.cusInfo.name.value"
            :class="{ 'error': !isWrite.cusInfo.name.value }"
            autocomplete="off"
            >
        </div>
        <div class="label-input-template">
          <label for="nickName" :class="{ 'error': !isWrite.cusInfo.nickName.value }">Nick Name:</label>
          <input id="nickName" type="text" name="nickName" v-model="formData.cusInfo.nickName.value"
            :class="{ 'error': !isWrite.cusInfo.nickName.value }">
        </div>
        <div class="label-input-template">
          <label for="email" :class="{ 'error': !isWrite.cusInfo.email.value }">Email:</label>
          <input id="email" type="email" name="email" v-model="formData.cusInfo.email.value"
            :class="{ 'error': !isWrite.cusInfo.email.value }"
            autocomplete="off">
        </div>
      </div>
      <div class="sm-info">
        <span>詳細地址</span>
        <div class="label-input-template">
          <label for="address" :class="{ 'error': !isWrite.addressInfo.address.value }">Address:</label>
          <input id="address" type="text" name="address" v-model="formData.addressInfo.address.value"
            :class="{ 'error': !isWrite.addressInfo.address.value }"
            autocomplete="off">
        </div>
        <div class="label-input-template">
          <label for="ville" :class="{ 'error': !isWrite.addressInfo.ville.value }">Ville:</label>
          <input id="ville" type="text" name="ville" v-model="formData.addressInfo.ville.value"
            :class="{ 'error': !isWrite.addressInfo.ville.value }">
        </div>
        <div class="label-input-template">
          <label for="codePostal" :class="{ 'error': !isWrite.addressInfo.codePostal.value }">Code Postal:</label>
          <input id="codePostal" type="text" name="codePostal" v-model="formData.addressInfo.codePostal.value"
            :class="{ 'error': !isWrite.addressInfo.codePostal.value }">
        </div>
      </div>
      <div class="sm-info">
        <span>訂單資訊</span>
        <div class="label-input-template">
          <label for="date" :class="{ 'error': !isWrite.orderInfo.date.value }">Date</label>
          <input id="date" type="date" name="date" v-model="formData.orderInfo.date.value"
            :class="{ 'error': !isWrite.orderInfo.date.value }">
        </div>
        <div class="label-input-template">
          <label for="number" :class="{ 'error': !isWrite.orderInfo.number.value }">Number:</label>
          <input id="number" type="text" name="number" v-model="formData.orderInfo.number.value"
            :class="{ 'error': !isWrite.orderInfo.number.value }">
        </div>
      </div>
      <div class="submit-container">
        <input type="submit" value="送出表單">
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import type { Ref } from "vue";
import { createRegex } from "./createRegex";
interface FormData {
  cusInfo: {
    name: Ref<string>;
    nickName: Ref<string>;
    email: Ref<string>;
  };
  addressInfo: {
    address: Ref<string>;
    ville: Ref<string>;
    codePostal: Ref<string>;
  };
  orderInfo: {
    date: Ref<string>;
    number: Ref<string>;
  };
}

const formData: FormData = {
  cusInfo: {
    name: ref(""),
    nickName: ref(""),
    email: ref(""),
  },
  addressInfo: {
    address: ref(""),
    ville: ref(""),
    codePostal: ref(""),
  },
  orderInfo: {
    date: ref(""),
    number: ref(""),
  },
};
const isWrite = {
  cusInfo: {
    name: ref(true),
    nickName: ref(true),
    email: ref(true),
  },
  addressInfo: {
    address: ref(true),
    ville: ref(true),
    codePostal: ref(true),
  },
  orderInfo: {
    date: ref(true),
    number: ref(true),
  },
}
function onSubmit() {
  let isFormValid: boolean = true;
  for (const category of Object.keys(formData)) {
    const categoryData = formData[category as keyof FormData];
    const writeCategoryData = isWrite[category as keyof typeof isWrite];
    for (const field of Object.keys(categoryData)) {
      const fieldKey = field as keyof typeof categoryData;
      const fieldValue = categoryData[fieldKey] as Ref<string>;
      const writeValue = writeCategoryData[fieldKey] as Ref<boolean>
      const isValid = checkForm(fieldValue.value);
      writeValue.value = isValid
      if (!isValid) {
        isFormValid = false;
      }
    }
  }
  if (!isFormValid) {
    return
  } else {
    const outputData = JSON.stringify(formData, (key, value) => {
      return value && typeof value === 'object' && 'value' in value ? value.value : value;
    }, 2);
    alert("表單有效，可以提交！\n" + outputData);
  }
}
function checkForm(check: string) {
  if (check == "") {
    return false
  } else return true
}
const { addressInfo, orderInfo, cusInfo } = formData;

watch(() => cusInfo.name.value, (val) => {
  cusInfo.name.value = val.replace(createRegex("sEng", "bEng", "ch"), "");
});
watch(() => cusInfo.nickName.value, (val) => {
  cusInfo.nickName.value = val.replace(createRegex("sEng", "bEng", "ch"), "");
});

watch(() => addressInfo.address.value, (val) => {
  addressInfo.address.value = val.replace(createRegex("sEng", "bEng", "ch", "num"), "");
});
watch(() => addressInfo.ville.value, (val) => {
  addressInfo.ville.value = val.replace(createRegex("sEng", "bEng", "ch"), "");
});
watch(() => addressInfo.codePostal.value, (val) => {
  addressInfo.codePostal.value = val.substring(0, 3).replace(/\D/g, "");
});

watch(() => orderInfo.number.value, (val) => {
  orderInfo.number.value = val.substring(0, 10).replace(/\D/g, "");
});

</script>

<style scoped lang="scss">
@import "./CSS/form.css";
</style>

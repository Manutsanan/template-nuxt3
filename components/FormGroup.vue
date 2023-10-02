<template>
  <div class="d-flex flex-column">
    <label>
      {{ props.title }} <span v-if="props.isUnique" class="text-danger">*</span>
    </label>

    <div class="input-group-custom" :class="[
      props.isUnique
        ? (uniqueValidate && 'is-validate-true') || 'is-validate-false'
        : validate && 'is-validate-true'
    ]">
      <template v-if="!props.back && (props.icon || props.iconText)">
        <div class="icon-group-front">
          <i :class="props.icon"></i>
          <span v-if="props.iconText">{{ props.iconText }}</span>
        </div>
      </template>

      <template v-if="props.type == 'input'">
        <input type="text" class="form-control" v-model="rawDataModel" :placeholder="props.placeholder">
      </template>
      <template v-if="props.type == 'password'">
        <input :type="(typePassword && 'password') || 'text'" class="form-control" v-model="rawDataModel"
          :placeholder="props.placeholder">
      </template>
      <template v-if="props.type == 'number'">
        <input type="number" class="form-control" v-model.number="rawDataModel" :placeholder="props.placeholder">
      </template>
      <template v-if="props.type == 'date'">
        <Datepicker v-model:value="rawDataModel" value-type="timestamp" format="DD/MM/YYYY" />
      </template>
      <template v-if="props.type == 'year'">
        <Datepicker v-model:value="rawDataModel" value-type="format" format="YYYY" type="year" />
      </template>
      <template v-if="props.type == 'select'">
        <Vuemultiselect v-model="rawDataModel" :options="rawOptions" :label="props.selectLabel"
          :track-by="props.selectValue" :placeholder="props.placeholder">
        </Vuemultiselect>
      </template>
      <template v-if="props.type == 'textarea'">
        <textarea v-model="rawDataModel" :placeholder="props.placeholder"></textarea>
      </template>

      <template v-if="props.back && (props.icon || props.iconText)">
        <div class="icon-group-back">
          <i v-if="props.icon" :class="props.icon"></i>
          <span v-if="props.iconText">{{ props.iconText }}</span>
        </div>
      </template>
      <template v-if="props.type == 'password' && back">
        <div class="icon-group-back">
          <i class="fa-solid cursor-pointer eye-password" :class="(typePassword && 'fa-eye') || 'fa-eye-slash'"
            @click="typePassword = !typePassword"></i>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface Props {
  dataModel?: any
  placeholder?: string
  title?: string
  type?: string
  icon?: string
  iconText?: string
  back?: boolean
  isUnique?: boolean
  isDisabled?: boolean
  options?: any,
  selectLabel?: string,
  selectValue?: string
}

const props = withDefaults(defineProps<Props>(), {
  dataModel: null,
  placeholder: '',
  title: 'Label',
  type: 'input',
  icon: '',
  iconText: '',
  back: false,
  isUnique: false,
  isDisabled: false,
  options: [],
  selectLabel: 'text',
  selectValue: 'value',
})

const emit = defineEmits(['return'])

const typePassword = ref<boolean>(true);
const rawDataModel = ref<any>(null);
const rawOptions = ref<any>([]);

const uniqueValidate = computed(() => {
  if (rawDataModel.value == null || rawDataModel.value === '') {
    return true
  }

  if (props.type === 'number' && rawDataModel.value < 0) {
    return true
  }

  return false
})
const validate = computed(() => {
  if (props.type === 'number' && rawDataModel.value < 0) {
    return true
  }

  return false
})

watch([props?.dataModel, props?.options, rawDataModel], ([newA, newB, newC]: any, [prevA, prevB, prevC]: any,) => {
  // condition 1
  if (newA != prevA) {
    if (props.type !== 'select') {
      initDate()
    }
  }
  // condition 2
  if (newB != prevB) {
    initDate()
  }
  // condition 3
  if (newC != prevC) {
    callBack()
  }
}, {
  deep: true
})

onMounted(() => {
  initDate()
})

const initDate = () => {
  rawDataModel.value = JSON.parse(JSON.stringify(props.dataModel)) || null
  rawOptions.value = JSON.parse(JSON.stringify(props.options)) || []
}

const callBack = () => {
  emit('return', rawDataModel.value)
}
</script>

<style lang="scss">
.input-group-custom {
  display: flex;
  border: 1px solid #ccc;
  border-radius: 4px;

  &:focus-within {
    border-color: rgba(3, 124, 254, 0.307) !important;
  }

  &.is-validate-true {
    border-color: #dc3545 !important;
  }

  &.is-validate-false {
    border-color: #28a745 !important;
  }

  input,
  textarea {
    border: none;
    background: transparent;
    width: 100%;
    color: #74829c !important;

    &:focus {
      outline: 0;
      background: transparent;
      border: none !important;
      box-shadow: none !important;
    }
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }

  input::placeholder {
    font: 0.75rem/3 kanit;
    opacity: 0.6;
  }

  .icon-group-front {
    cursor: default;
    display: flex;
    gap: 3px;
    font-size: 14px;
    font-weight: 600;
    align-items: center;
    padding: 0 0 0 12px;
  }

  .mx-datepicker {
    width: 100%;

    .mx-input {
      border: none !important;
      box-shadow: none !important;

      &:hover {
        border-color: transparent !important;
      }
    }
  }

  .multiselect {
    .multiselect__tags {
      border-color: transparent !important;

      .multiselect__single {
        padding: 0;
        background: transparent !important;
      }
    }
  }

  .icon-group-back {
    cursor: default;
    display: flex;
    gap: 3px;
    font-size: 14px;
    font-weight: 600;
    align-items: center;
    padding: 0 12px 0 0;

    .eye-password {
      &:hover {
        opacity: 0.6;
      }
    }
  }
}
</style>

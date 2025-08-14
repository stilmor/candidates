import { ref } from 'vue';
import { useInterviewsStore } from '@/stores/interviews';
const props = defineProps();
const position = ref('');
const whenLocal = ref('');
const store = useInterviewsStore();
function submit() {
    const iso = whenLocal.value ? new Date(whenLocal.value).toISOString() : '';
    store.createInterview({ candidateId: props.candidateId, position: position.value, scheduledAt: iso });
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.VRow;
/** @type {[typeof __VLS_components.VRow, typeof __VLS_components.vRow, typeof __VLS_components.VRow, typeof __VLS_components.vRow, ]} */ ;
// @ts-ignore
VRow;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    dense: true,
}));
const __VLS_2 = __VLS_1({
    dense: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_4 } = __VLS_3.slots;
const __VLS_5 = {}.VCol;
/** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
// @ts-ignore
VCol;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
    cols: "6",
}));
const __VLS_7 = __VLS_6({
    cols: "6",
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
const { default: __VLS_9 } = __VLS_8.slots;
const __VLS_10 = {}.VTextField;
/** @type {[typeof __VLS_components.VTextField, typeof __VLS_components.vTextField, ]} */ ;
// @ts-ignore
VTextField;
// @ts-ignore
const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
    modelValue: (__VLS_ctx.position),
    label: "Posición",
    required: true,
}));
const __VLS_12 = __VLS_11({
    modelValue: (__VLS_ctx.position),
    label: "Posición",
    required: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_11));
// @ts-ignore
[position,];
var __VLS_8;
const __VLS_15 = {}.VCol;
/** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
// @ts-ignore
VCol;
// @ts-ignore
const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({
    cols: "4",
}));
const __VLS_17 = __VLS_16({
    cols: "4",
}, ...__VLS_functionalComponentArgsRest(__VLS_16));
const { default: __VLS_19 } = __VLS_18.slots;
const __VLS_20 = {}.VTextField;
/** @type {[typeof __VLS_components.VTextField, typeof __VLS_components.vTextField, ]} */ ;
// @ts-ignore
VTextField;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    modelValue: (__VLS_ctx.whenLocal),
    type: "datetime-local",
    label: "Fecha/hora",
    required: true,
}));
const __VLS_22 = __VLS_21({
    modelValue: (__VLS_ctx.whenLocal),
    type: "datetime-local",
    label: "Fecha/hora",
    required: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
// @ts-ignore
[whenLocal,];
var __VLS_18;
const __VLS_25 = {}.VCol;
/** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
// @ts-ignore
VCol;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
    cols: "2",
    ...{ class: "d-flex align-end" },
}));
const __VLS_27 = __VLS_26({
    cols: "2",
    ...{ class: "d-flex align-end" },
}, ...__VLS_functionalComponentArgsRest(__VLS_26));
const { default: __VLS_29 } = __VLS_28.slots;
const __VLS_30 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
VBtn;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({
    ...{ 'onClick': {} },
    color: "primary",
    loading: (__VLS_ctx.store.loading),
}));
const __VLS_32 = __VLS_31({
    ...{ 'onClick': {} },
    color: "primary",
    loading: (__VLS_ctx.store.loading),
}, ...__VLS_functionalComponentArgsRest(__VLS_31));
let __VLS_34;
let __VLS_35;
const __VLS_36 = ({ click: {} },
    { onClick: (__VLS_ctx.submit) });
const { default: __VLS_37 } = __VLS_33.slots;
// @ts-ignore
[store, submit,];
var __VLS_33;
var __VLS_28;
var __VLS_3;
if (__VLS_ctx.store.error) {
    // @ts-ignore
    [store,];
    const __VLS_38 = {}.VAlert;
    /** @type {[typeof __VLS_components.VAlert, typeof __VLS_components.vAlert, typeof __VLS_components.VAlert, typeof __VLS_components.vAlert, ]} */ ;
    // @ts-ignore
    VAlert;
    // @ts-ignore
    const __VLS_39 = __VLS_asFunctionalComponent(__VLS_38, new __VLS_38({
        type: "error",
        ...{ class: "mt-2" },
    }));
    const __VLS_40 = __VLS_39({
        type: "error",
        ...{ class: "mt-2" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_39));
    const { default: __VLS_42 } = __VLS_41.slots;
    (__VLS_ctx.store.error);
    // @ts-ignore
    [store,];
    var __VLS_41;
}
if (__VLS_ctx.store.lastCreated) {
    // @ts-ignore
    [store,];
    const __VLS_43 = {}.VAlert;
    /** @type {[typeof __VLS_components.VAlert, typeof __VLS_components.vAlert, typeof __VLS_components.VAlert, typeof __VLS_components.vAlert, ]} */ ;
    // @ts-ignore
    VAlert;
    // @ts-ignore
    const __VLS_44 = __VLS_asFunctionalComponent(__VLS_43, new __VLS_43({
        type: "success",
        ...{ class: "mt-2" },
    }));
    const __VLS_45 = __VLS_44({
        type: "success",
        ...{ class: "mt-2" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_44));
    const { default: __VLS_47 } = __VLS_46.slots;
    var __VLS_46;
}
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['align-end']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            position: position,
            whenLocal: whenLocal,
            store: store,
            submit: submit,
        };
    },
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
    },
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */

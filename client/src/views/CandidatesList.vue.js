import { ref, onMounted } from 'vue';
import { useCandidatesStore } from '@/stores/candidates';
const store = useCandidatesStore();
const name = ref('');
const email = ref('');
function search() {
    store.fetchAll({ name: name.value || undefined, email: email.value || undefined });
}
onMounted(() => store.fetchAll());
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['search-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['contained']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "page" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "container" },
});
__VLS_asFunctionalElement(__VLS_elements.h2, __VLS_elements.h2)({
    ...{ class: "title mb-6" },
});
const __VLS_0 = {}.VRow;
/** @type {[typeof __VLS_components.VRow, typeof __VLS_components.vRow, typeof __VLS_components.VRow, typeof __VLS_components.vRow, ]} */ ;
// @ts-ignore
VRow;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ class: "mb-4" },
    justify: "center",
    align: "end",
}));
const __VLS_2 = __VLS_1({
    ...{ class: "mb-4" },
    justify: "center",
    align: "end",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_4 } = __VLS_3.slots;
const __VLS_5 = {}.VCol;
/** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
// @ts-ignore
VCol;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
    cols: "12",
    md: "5",
}));
const __VLS_7 = __VLS_6({
    cols: "12",
    md: "5",
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
const { default: __VLS_9 } = __VLS_8.slots;
const __VLS_10 = {}.VTextField;
/** @type {[typeof __VLS_components.VTextField, typeof __VLS_components.vTextField, ]} */ ;
// @ts-ignore
VTextField;
// @ts-ignore
const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
    modelValue: (__VLS_ctx.name),
    label: "Buscar por nombre",
}));
const __VLS_12 = __VLS_11({
    modelValue: (__VLS_ctx.name),
    label: "Buscar por nombre",
}, ...__VLS_functionalComponentArgsRest(__VLS_11));
// @ts-ignore
[name,];
var __VLS_8;
const __VLS_15 = {}.VCol;
/** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
// @ts-ignore
VCol;
// @ts-ignore
const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({
    cols: "12",
    md: "5",
}));
const __VLS_17 = __VLS_16({
    cols: "12",
    md: "5",
}, ...__VLS_functionalComponentArgsRest(__VLS_16));
const { default: __VLS_19 } = __VLS_18.slots;
const __VLS_20 = {}.VTextField;
/** @type {[typeof __VLS_components.VTextField, typeof __VLS_components.vTextField, ]} */ ;
// @ts-ignore
VTextField;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    modelValue: (__VLS_ctx.email),
    label: "Buscar por email",
}));
const __VLS_22 = __VLS_21({
    modelValue: (__VLS_ctx.email),
    label: "Buscar por email",
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
// @ts-ignore
[email,];
var __VLS_18;
var __VLS_3;
const __VLS_25 = {}.VRow;
/** @type {[typeof __VLS_components.VRow, typeof __VLS_components.vRow, typeof __VLS_components.VRow, typeof __VLS_components.vRow, ]} */ ;
// @ts-ignore
VRow;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
    ...{ class: "mb-6" },
    justify: "center",
}));
const __VLS_27 = __VLS_26({
    ...{ class: "mb-6" },
    justify: "center",
}, ...__VLS_functionalComponentArgsRest(__VLS_26));
const { default: __VLS_29 } = __VLS_28.slots;
const __VLS_30 = {}.VCol;
/** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
// @ts-ignore
VCol;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({
    cols: "12",
    md: "3",
    ...{ class: "d-flex justify-center" },
}));
const __VLS_32 = __VLS_31({
    cols: "12",
    md: "3",
    ...{ class: "d-flex justify-center" },
}, ...__VLS_functionalComponentArgsRest(__VLS_31));
const { default: __VLS_34 } = __VLS_33.slots;
const __VLS_35 = {}.VBtn;
/** @type {[typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, typeof __VLS_components.VBtn, typeof __VLS_components.vBtn, ]} */ ;
// @ts-ignore
VBtn;
// @ts-ignore
const __VLS_36 = __VLS_asFunctionalComponent(__VLS_35, new __VLS_35({
    ...{ 'onClick': {} },
    color: "primary",
    ...{ class: "search-btn" },
}));
const __VLS_37 = __VLS_36({
    ...{ 'onClick': {} },
    color: "primary",
    ...{ class: "search-btn" },
}, ...__VLS_functionalComponentArgsRest(__VLS_36));
let __VLS_39;
let __VLS_40;
const __VLS_41 = ({ click: {} },
    { onClick: (__VLS_ctx.search) });
const { default: __VLS_42 } = __VLS_38.slots;
// @ts-ignore
[search,];
var __VLS_38;
var __VLS_33;
var __VLS_28;
if (__VLS_ctx.store.loading) {
    // @ts-ignore
    [store,];
    const __VLS_43 = {}.VProgressLinear;
    /** @type {[typeof __VLS_components.VProgressLinear, typeof __VLS_components.vProgressLinear, ]} */ ;
    // @ts-ignore
    VProgressLinear;
    // @ts-ignore
    const __VLS_44 = __VLS_asFunctionalComponent(__VLS_43, new __VLS_43({
        indeterminate: true,
        ...{ class: "mb-4 contained" },
    }));
    const __VLS_45 = __VLS_44({
        indeterminate: true,
        ...{ class: "mb-4 contained" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_44));
}
if (__VLS_ctx.store.error) {
    // @ts-ignore
    [store,];
    const __VLS_48 = {}.VAlert;
    /** @type {[typeof __VLS_components.VAlert, typeof __VLS_components.vAlert, typeof __VLS_components.VAlert, typeof __VLS_components.vAlert, ]} */ ;
    // @ts-ignore
    VAlert;
    // @ts-ignore
    const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({
        type: "error",
        ...{ class: "mb-4 contained text-center" },
    }));
    const __VLS_50 = __VLS_49({
        type: "error",
        ...{ class: "mb-4 contained text-center" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_49));
    const { default: __VLS_52 } = __VLS_51.slots;
    (__VLS_ctx.store.error);
    // @ts-ignore
    [store,];
    var __VLS_51;
}
const __VLS_53 = {}.VRow;
/** @type {[typeof __VLS_components.VRow, typeof __VLS_components.vRow, typeof __VLS_components.VRow, typeof __VLS_components.vRow, ]} */ ;
// @ts-ignore
VRow;
// @ts-ignore
const __VLS_54 = __VLS_asFunctionalComponent(__VLS_53, new __VLS_53({
    justify: "center",
}));
const __VLS_55 = __VLS_54({
    justify: "center",
}, ...__VLS_functionalComponentArgsRest(__VLS_54));
const { default: __VLS_57 } = __VLS_56.slots;
const __VLS_58 = {}.VCol;
/** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
// @ts-ignore
VCol;
// @ts-ignore
const __VLS_59 = __VLS_asFunctionalComponent(__VLS_58, new __VLS_58({
    cols: "12",
    md: "10",
    lg: "8",
}));
const __VLS_60 = __VLS_59({
    cols: "12",
    md: "10",
    lg: "8",
}, ...__VLS_functionalComponentArgsRest(__VLS_59));
const { default: __VLS_62 } = __VLS_61.slots;
if (__VLS_ctx.store.list.length) {
    // @ts-ignore
    [store,];
    const __VLS_63 = {}.VList;
    /** @type {[typeof __VLS_components.VList, typeof __VLS_components.vList, typeof __VLS_components.VList, typeof __VLS_components.vList, ]} */ ;
    // @ts-ignore
    VList;
    // @ts-ignore
    const __VLS_64 = __VLS_asFunctionalComponent(__VLS_63, new __VLS_63({}));
    const __VLS_65 = __VLS_64({}, ...__VLS_functionalComponentArgsRest(__VLS_64));
    const { default: __VLS_67 } = __VLS_66.slots;
    for (const [c] of __VLS_getVForSourceType((__VLS_ctx.store.list))) {
        // @ts-ignore
        [store,];
        const __VLS_68 = {}.VListItem;
        /** @type {[typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, ]} */ ;
        // @ts-ignore
        VListItem;
        // @ts-ignore
        const __VLS_69 = __VLS_asFunctionalComponent(__VLS_68, new __VLS_68({
            key: (c.id),
            to: (`/candidates/${c.id}`),
            link: true,
        }));
        const __VLS_70 = __VLS_69({
            key: (c.id),
            to: (`/candidates/${c.id}`),
            link: true,
        }, ...__VLS_functionalComponentArgsRest(__VLS_69));
        const { default: __VLS_72 } = __VLS_71.slots;
        const __VLS_73 = {}.VListItemTitle;
        /** @type {[typeof __VLS_components.VListItemTitle, typeof __VLS_components.vListItemTitle, typeof __VLS_components.VListItemTitle, typeof __VLS_components.vListItemTitle, ]} */ ;
        // @ts-ignore
        VListItemTitle;
        // @ts-ignore
        const __VLS_74 = __VLS_asFunctionalComponent(__VLS_73, new __VLS_73({}));
        const __VLS_75 = __VLS_74({}, ...__VLS_functionalComponentArgsRest(__VLS_74));
        const { default: __VLS_77 } = __VLS_76.slots;
        (c.firstName);
        (c.lastName);
        var __VLS_76;
        const __VLS_78 = {}.VListItemSubtitle;
        /** @type {[typeof __VLS_components.VListItemSubtitle, typeof __VLS_components.vListItemSubtitle, typeof __VLS_components.VListItemSubtitle, typeof __VLS_components.vListItemSubtitle, ]} */ ;
        // @ts-ignore
        VListItemSubtitle;
        // @ts-ignore
        const __VLS_79 = __VLS_asFunctionalComponent(__VLS_78, new __VLS_78({}));
        const __VLS_80 = __VLS_79({}, ...__VLS_functionalComponentArgsRest(__VLS_79));
        const { default: __VLS_82 } = __VLS_81.slots;
        (c.email);
        (c.status);
        var __VLS_81;
        var __VLS_71;
    }
    var __VLS_66;
}
else {
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "text-medium-emphasis text-center" },
    });
}
var __VLS_61;
var __VLS_56;
/** @type {__VLS_StyleScopedClasses['page']} */ ;
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['d-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['search-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['contained']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['contained']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            store: store,
            name: name,
            email: email,
            search: search,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
    },
});
; /* PartiallyEnd: #4569/main.vue */

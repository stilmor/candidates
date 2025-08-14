import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useCandidatesStore } from '@/stores/candidates';
import { useInterviewsStore } from '@/stores/interviews';
import InterviewForm from '@/components/InterviewForm.vue';
const route = useRoute();
const candidates = useCandidatesStore();
const interviews = useInterviewsStore();
onMounted(() => {
    const id = String(route.params.id);
    candidates.fetchById(id);
    interviews.fetchForCandidate(id);
});
watch(() => route.params.id, (val) => {
    const id = String(val ?? '');
    candidates.fetchById(id);
    interviews.fetchForCandidate(id);
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_elements;
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "page" },
});
__VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
    ...{ class: "container" },
});
if (__VLS_ctx.candidates.loading) {
    // @ts-ignore
    [candidates,];
    const __VLS_0 = {}.VProgressLinear;
    /** @type {[typeof __VLS_components.VProgressLinear, typeof __VLS_components.vProgressLinear, ]} */ ;
    // @ts-ignore
    VProgressLinear;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        indeterminate: true,
        ...{ class: "mb-4 contained" },
    }));
    const __VLS_2 = __VLS_1({
        indeterminate: true,
        ...{ class: "mb-4 contained" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
}
if (__VLS_ctx.candidates.error) {
    // @ts-ignore
    [candidates,];
    const __VLS_5 = {}.VAlert;
    /** @type {[typeof __VLS_components.VAlert, typeof __VLS_components.vAlert, typeof __VLS_components.VAlert, typeof __VLS_components.vAlert, ]} */ ;
    // @ts-ignore
    VAlert;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
        type: "error",
        ...{ class: "mb-4 contained text-center" },
    }));
    const __VLS_7 = __VLS_6({
        type: "error",
        ...{ class: "mb-4 contained text-center" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
    const { default: __VLS_9 } = __VLS_8.slots;
    (__VLS_ctx.candidates.error);
    // @ts-ignore
    [candidates,];
    var __VLS_8;
}
if (__VLS_ctx.candidates.current) {
    // @ts-ignore
    [candidates,];
    __VLS_asFunctionalElement(__VLS_elements.h2, __VLS_elements.h2)({
        ...{ class: "title mb-1" },
    });
    (__VLS_ctx.candidates.current.firstName);
    (__VLS_ctx.candidates.current.lastName);
    // @ts-ignore
    [candidates, candidates,];
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "subtitle mb-6" },
    });
    (__VLS_ctx.candidates.current.email);
    (__VLS_ctx.candidates.current.status);
    // @ts-ignore
    [candidates, candidates,];
    __VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({
        ...{ class: "section mb-2" },
    });
    __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
        ...{ class: "contained mb-6" },
    });
    /** @type {[typeof InterviewForm, ]} */ ;
    // @ts-ignore
    const __VLS_10 = __VLS_asFunctionalComponent(InterviewForm, new InterviewForm({
        candidateId: (__VLS_ctx.candidates.current.id),
    }));
    const __VLS_11 = __VLS_10({
        candidateId: (__VLS_ctx.candidates.current.id),
    }, ...__VLS_functionalComponentArgsRest(__VLS_10));
    // @ts-ignore
    [candidates,];
    __VLS_asFunctionalElement(__VLS_elements.h3, __VLS_elements.h3)({
        ...{ class: "section mb-2" },
    });
    if (__VLS_ctx.interviews.loading) {
        // @ts-ignore
        [interviews,];
        const __VLS_14 = {}.VProgressLinear;
        /** @type {[typeof __VLS_components.VProgressLinear, typeof __VLS_components.vProgressLinear, ]} */ ;
        // @ts-ignore
        VProgressLinear;
        // @ts-ignore
        const __VLS_15 = __VLS_asFunctionalComponent(__VLS_14, new __VLS_14({
            indeterminate: true,
            ...{ class: "mb-3 contained" },
        }));
        const __VLS_16 = __VLS_15({
            indeterminate: true,
            ...{ class: "mb-3 contained" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_15));
    }
    if (__VLS_ctx.interviews.error) {
        // @ts-ignore
        [interviews,];
        const __VLS_19 = {}.VAlert;
        /** @type {[typeof __VLS_components.VAlert, typeof __VLS_components.vAlert, typeof __VLS_components.VAlert, typeof __VLS_components.vAlert, ]} */ ;
        // @ts-ignore
        VAlert;
        // @ts-ignore
        const __VLS_20 = __VLS_asFunctionalComponent(__VLS_19, new __VLS_19({
            type: "error",
            ...{ class: "mb-3 contained text-center" },
        }));
        const __VLS_21 = __VLS_20({
            type: "error",
            ...{ class: "mb-3 contained text-center" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_20));
        const { default: __VLS_23 } = __VLS_22.slots;
        (__VLS_ctx.interviews.error);
        // @ts-ignore
        [interviews,];
        var __VLS_22;
    }
    const __VLS_24 = {}.VRow;
    /** @type {[typeof __VLS_components.VRow, typeof __VLS_components.vRow, typeof __VLS_components.VRow, typeof __VLS_components.vRow, ]} */ ;
    // @ts-ignore
    VRow;
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
        justify: "center",
    }));
    const __VLS_26 = __VLS_25({
        justify: "center",
    }, ...__VLS_functionalComponentArgsRest(__VLS_25));
    const { default: __VLS_28 } = __VLS_27.slots;
    const __VLS_29 = {}.VCol;
    /** @type {[typeof __VLS_components.VCol, typeof __VLS_components.vCol, typeof __VLS_components.VCol, typeof __VLS_components.vCol, ]} */ ;
    // @ts-ignore
    VCol;
    // @ts-ignore
    const __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({
        cols: "12",
        md: "10",
        lg: "8",
    }));
    const __VLS_31 = __VLS_30({
        cols: "12",
        md: "10",
        lg: "8",
    }, ...__VLS_functionalComponentArgsRest(__VLS_30));
    const { default: __VLS_33 } = __VLS_32.slots;
    if (__VLS_ctx.interviews.byCandidate.get(__VLS_ctx.candidates.current.id)?.length) {
        // @ts-ignore
        [candidates, interviews,];
        const __VLS_34 = {}.VList;
        /** @type {[typeof __VLS_components.VList, typeof __VLS_components.vList, typeof __VLS_components.VList, typeof __VLS_components.vList, ]} */ ;
        // @ts-ignore
        VList;
        // @ts-ignore
        const __VLS_35 = __VLS_asFunctionalComponent(__VLS_34, new __VLS_34({}));
        const __VLS_36 = __VLS_35({}, ...__VLS_functionalComponentArgsRest(__VLS_35));
        const { default: __VLS_38 } = __VLS_37.slots;
        for (const [i] of __VLS_getVForSourceType((__VLS_ctx.interviews.byCandidate.get(__VLS_ctx.candidates.current.id)))) {
            // @ts-ignore
            [candidates, interviews,];
            const __VLS_39 = {}.VListItem;
            /** @type {[typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, typeof __VLS_components.VListItem, typeof __VLS_components.vListItem, ]} */ ;
            // @ts-ignore
            VListItem;
            // @ts-ignore
            const __VLS_40 = __VLS_asFunctionalComponent(__VLS_39, new __VLS_39({
                key: (i.id),
            }));
            const __VLS_41 = __VLS_40({
                key: (i.id),
            }, ...__VLS_functionalComponentArgsRest(__VLS_40));
            const { default: __VLS_43 } = __VLS_42.slots;
            const __VLS_44 = {}.VListItemTitle;
            /** @type {[typeof __VLS_components.VListItemTitle, typeof __VLS_components.vListItemTitle, typeof __VLS_components.VListItemTitle, typeof __VLS_components.vListItemTitle, ]} */ ;
            // @ts-ignore
            VListItemTitle;
            // @ts-ignore
            const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({}));
            const __VLS_46 = __VLS_45({}, ...__VLS_functionalComponentArgsRest(__VLS_45));
            const { default: __VLS_48 } = __VLS_47.slots;
            (new Date(i.scheduledAt).toLocaleString());
            (i.position);
            var __VLS_47;
            var __VLS_42;
        }
        var __VLS_37;
    }
    else {
        __VLS_asFunctionalElement(__VLS_elements.div, __VLS_elements.div)({
            ...{ class: "text-medium-emphasis text-center" },
        });
    }
    var __VLS_32;
    var __VLS_27;
}
/** @type {__VLS_StyleScopedClasses['page']} */ ;
/** @type {__VLS_StyleScopedClasses['container']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['contained']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['contained']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['subtitle']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['section']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['contained']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['section']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['contained']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['contained']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-medium-emphasis']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            InterviewForm: InterviewForm,
            candidates: candidates,
            interviews: interviews,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
    },
});
; /* PartiallyEnd: #4569/main.vue */

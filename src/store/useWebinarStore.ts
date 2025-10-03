import { validateAdditionalInfo, validateBasicInfo, validateCTA, ValidationErrors } from '@/lib/type'
import { CtaTypeEnum } from '@prisma/client'

import {create} from 'zustand'
export type WebinarFormState = {
    basicInfo: {
        webinarName?: string,
        description?: string,
        date?: Date
        time?: string,
        timeFormat?: "AM" | "PM"
        timeZone? : string
    }
    cta: {
        ctaLabel?: string,
        tags? : string[],
        ctaType: CtaTypeEnum,
        aiAgent?: string,
        priceId: string
    }
    additionalInfo: {
        lockChat?: boolean,
        couponCode?: string,
        couponEnabled?: boolean,
    }
}
type ValidationStep = {
    basicInfo: {
        valid: boolean,
        errors: ValidationErrors
    }
    cta: {
        valid: boolean,
        errors: ValidationErrors
    }
    additionalInfo: {
        valid: boolean,
        errors: ValidationErrors
    }
}
type WebinarStore = {
    isModalOpen: boolean
    isComplete: boolean
    isSubmitting: boolean
    formData: WebinarFormState
    validation: ValidationStep
    setModalOpen: (open: boolean) => void
    setComplete: (complete: boolean) => void
    setSubmitting: (submitting: boolean) => void

    updateBasicInfoField: <K extends keyof WebinarFormState['basicInfo']>(
        field: K,
        value: WebinarFormState['basicInfo'][K]

    ) => void

    updateCtaField: <K extends keyof WebinarFormState['cta']>(
        field: K,
        value: WebinarFormState['cta'][K]
    ) => void

    updateAdditionalInfoField: <K extends keyof WebinarFormState['additionalInfo']>(
        field: K,
        value: WebinarFormState['additionalInfo'][K]
    ) => void
    addTag: (tag: string) => void;
    removeTag: (tag: string) => void;
    validateStep: (stepId: keyof WebinarFormState) => boolean
    getStepValidationErrors: (stepId: keyof WebinarFormState) => ValidationErrors
    resetForm: () => void
   
}
 const defaultFormData: WebinarFormState = {
        basicInfo: {
        webinarName: "",
        description: "",
        date: undefined,
        time: "",
        timeFormat: "AM" ,
        timeZone : "UTC",
    },
    cta: {
        ctaLabel: "",
        tags : [],
        ctaType: "BOOK_A_CALL",
        aiAgent: "",
        priceId: "",
    },
    additionalInfo: {
        lockChat: false,
        couponCode: "",
        couponEnabled: false,
    }  ,
    };
    const defaultValidation: ValidationStep = {
         basicInfo: {
        valid: false,
        errors: {}
    },
    cta: {
        valid: false,
        errors: {}
    },
    additionalInfo: {
        valid: false,
        errors: {},
    },
    };
    
export const useWebinarStore = create<WebinarStore>((set, get) => ({
    isModalOpen: false,
    isComplete: false,
    isSubmitting: false,
    formData: defaultFormData,
    validation: defaultValidation,
    setModalOpen: (open: boolean) => set({isModalOpen: open}),
    setComplete: (complete:boolean)  => set({isComplete: complete}),
    setSubmitting: (submitting: boolean) => set({isSubmitting: submitting}),
    

    updateBasicInfoField: (field, value) => {set((state) => {
        const newBasicInfo = {...state.formData.basicInfo, [field]: value}
        const validationResult = validateBasicInfo(newBasicInfo)

        return {
            formData: {...state.formData, basicInfo: newBasicInfo},
            validation: {...state.validation, basicInfo: validationResult},
        }
    })},
    updateCtaField: (field, value) => {set((state) => {
        const newCta = {...state.formData.cta, [field]: value}
        const validationResult = validateCTA(newCta)
        return {
            formData: {...state.formData, cta: newCta},
            validation: {...state.validation, cta: validationResult}
        }

    })},
    updateAdditionalInfoField: (field, value) => {set((state) => {
        const newAdditionalInfo = {...state.formData.additionalInfo, [field]: value}
        const validationResult = validateAdditionalInfo(newAdditionalInfo)
        return {
            formData: {...state.formData, additionalInfo: newAdditionalInfo},
            validation: {...state.validation, additionalInfo: validationResult}
        }
    })},
   addTag: (tag: string) => {
  set((state) => ({
    formData: {
      ...state.formData,
      cta: {
        ...state.formData.cta,
        tags: [...(state.formData.cta.tags || []), tag],
      },
    },
  }));
},
    removeTag: (tagToRemove: string) => {set((state) => {
const newTags = (state.formData.cta.tags || []).filter((tag) => tag !== tagToRemove)
const newCTA = {...state.formData.cta, tags: newTags}
return {
    formData: {
        ...state.formData,
        cta: newCTA
    }
}
    })},
    validateStep: (stepId: keyof WebinarFormState) => {
        const {formData} = get()
        let validationResult;
        switch (stepId) {
            case 'basicInfo':
                validationResult = validateBasicInfo(formData.basicInfo)
                break
            case 'cta':
                validationResult = validateCTA(formData.cta)
                break
            case 'additionalInfo':
                validationResult = validateAdditionalInfo(formData.additionalInfo)
                
                 break;
                
        }
        

        set((state) => {
            return {
                validation: {...state.validation, [stepId]: validationResult}
            }
        })
        return validationResult.valid
    },

    getStepValidationErrors: (stepId: keyof WebinarFormState) => {
        const {validation} = get()
        return validation[stepId].errors

    },

    resetForm: () => set({ isComplete: false,isSubmitting: false ,formData: defaultFormData, validation: defaultValidation}),


}))
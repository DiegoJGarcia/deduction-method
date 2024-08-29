import { create } from 'zustand';

export interface Fact {
  text: string;
}

export interface Experiment {
  consequence: string;
  experiment: string;
  result: boolean;
}

export interface Hypothesis {
  text: string;
  facts: Fact[];
  experiments: Experiment[];
  isValid: boolean | null;
  isVisible: boolean;
}

export interface Method {
  problem: string;
  facts: Fact[];
  hypotheses: Hypothesis[];
}

export interface Store {
  methods: Method[];
  addMethod: (problem: string) => void;
  addFact: (methodIndex: number, fact: string) => void;
  addHypothesis: (methodIndex: number, hypothesisText: string) => void;
  addExperiment: (
    methodIndex: number,
    hypothesisIndex: number,
    consequence: string,
    experiment: string
  ) => void;
  toggleExperimentResult: (
    methodIndex: number,
    hypothesisIndex: number,
    experimentIndex: number
  ) => void;
  removeFact: (methodIndex: number, factIndex: number) => void;
}

const useStore = create<Store>((set) => ({
  methods: [],
  addMethod: (problem: string) => set((state) => ({
    methods: [
      ...state.methods,
      {
        problem,
        facts: [],
        hypotheses: [],
      },
    ],
  })),
  addFact: (methodIndex, fact) =>
    set((state) => {
      const updatedMethods = [...state.methods];
      updatedMethods[methodIndex].facts.push({ text: fact });
      return { methods: updatedMethods };
    }),
  addHypothesis: (methodIndex, hypothesisText) =>
    set((state) => {
      const updatedMethods = [...state.methods];
      updatedMethods[methodIndex].hypotheses.push({
        text: hypothesisText,
        facts: [],
        experiments: [],
        isValid: null,
        isVisible: true,
      });
      return { methods: updatedMethods };
    }),
  addExperiment: (methodIndex, hypothesisIndex, consequence, experiment) =>
    set((state) => {
      const updatedMethods = [...state.methods];
      const currentHypothesis =
        updatedMethods[methodIndex].hypotheses[hypothesisIndex];
      currentHypothesis.experiments.push({
        consequence,
        experiment,
        result: false,
      });
      return { methods: updatedMethods };
    }),
  toggleExperimentResult: (methodIndex, hypothesisIndex, experimentIndex) =>
    set((state) => {
      const updatedMethods = [...state.methods];
      const currentHypothesis =
        updatedMethods[methodIndex].hypotheses[hypothesisIndex];
      const experiment = currentHypothesis.experiments[experimentIndex];
      experiment.result = !experiment.result;

      // Verificar si todos los experimentos son verdaderos
      const allTrue = currentHypothesis.experiments.every(
        (exp) => exp.result === true
      );
      const anyFalse = currentHypothesis.experiments.some(
        (exp) => exp.result === false
      );

      if (allTrue) {
        currentHypothesis.isValid = true;
      } else if (anyFalse) {
        currentHypothesis.isValid = false;
      }

      return { methods: updatedMethods };
    }),
  removeFact: (methodIndex, factIndex) =>
    set((state) => {
      const updatedMethods = [...state.methods];
      updatedMethods[methodIndex].facts.splice(factIndex, 1);
      return { methods: updatedMethods };
    }),
}));

export default useStore;

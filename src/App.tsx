import React, { useState } from 'react';
import useStore from './store/store';
import styled from 'styled-components';
import { Experiment, Fact, Hypothesis, Method } from './store/store';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
`;

const Header = styled.h1`
  text-align: center;
  color: #8e44ad;
`;

const Card = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const MethodTitle = styled.h2`
  color: #8e44ad;
`;

const HypothesisContainer = styled.div<{ isValid: boolean | null }>`
  background-color: ${({ isValid }) =>
    isValid === true ? '#e0ffe0' : isValid === false ? '#ffe0e0' : 'white'};
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  border: 2px solid ${({ isValid }) => (isValid === true ? 'green' : isValid === false ? 'red' : '#ccc')};
`;

const HypothesisHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const HypothesisTitle = styled.h3`
  margin: 0;
`;

const ToggleButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 1.2em;
  cursor: pointer;
`;

const SectionTitle = styled.h4`
  color: #8e44ad;
  margin-top: 10px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1em;
`;

const FactContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 10px;
`;

const FactChip = styled.div`
  background-color: #ececec;
  padding: 8px;
  border-radius: 15px;
  font-size: 0.9em;
  color: #333;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const RemoveButton = styled.button`
  background-color: #ff5c5c;
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AddFactInput = styled.input`
  flex-grow: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 15px;
  font-size: 0.9em;
  color: #333;
`;

const AddButton = styled.button`
  background-color: #8e44ad;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  margin-left: 5px;

  &:hover {
    background-color: #732d91;
  }
`;

const ExperimentContainer = styled.div`
  margin-top: 10px;
`;

const ExperimentBlock = styled.div`
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const CheckButton = styled.button<{ result: boolean }>`
  background-color: ${({ result }) => (result ? '#4CAF50' : '#F44336')};
  border: none;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const Button = styled.button`
  background-color: #8e44ad;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  width: 100%;
  font-size: 1em;

  &:hover {
    background-color: #732d91;
  }
`;

const App: React.FC = () => {
  const { methods, addMethod, addFact, addHypothesis, addExperiment, toggleExperimentResult, removeFact } = useStore();
  const [problem, setProblem] = useState('');
  const [newFact, setNewFact] = useState('');
  const [newHypothesis, setNewHypothesis] = useState('');
  const [newConsequence, setNewConsequence] = useState('');
  const [newExperiment, setNewExperiment] = useState('');
  const [expandedHypotheses, setExpandedHypotheses] = useState<{ [key: string]: boolean }>({});

  const handleCreateNewMethod = () => {
    addMethod(problem);
    setProblem('');
  };

  const toggleHypothesisVisibility = (methodIndex: number, hypothesisIndex: number) => {
    setExpandedHypotheses((prevState) => ({
      ...prevState,
      [`${methodIndex}-${hypothesisIndex}`]: !prevState[`${methodIndex}-${hypothesisIndex}`],
    }));
  };

  return (
    <Container>
      <Header>Método Deductivo</Header>

      <SectionTitle>Planteamiento del Problema</SectionTitle>
      <TextArea
        value={problem}
        onChange={(e) => setProblem(e.target.value)}
        placeholder="Describe el problema en 2-3 líneas"
      />
      <Button onClick={handleCreateNewMethod}>Crear Método</Button>

      {methods.map((method: Method, methodIndex: number) => (
        <Card key={methodIndex}>
          <MethodTitle>{method.problem}</MethodTitle>

          {method.hypotheses.map((hypothesis: Hypothesis, hypothesisIndex: number) => (
            <HypothesisContainer key={hypothesisIndex} isValid={hypothesis.isValid}>
              <HypothesisHeader onClick={() => toggleHypothesisVisibility(methodIndex, hypothesisIndex)}>
                <HypothesisTitle>Hipótesis {hypothesisIndex + 1}</HypothesisTitle>
                <ToggleButton>
                  {expandedHypotheses[`${methodIndex}-${hypothesisIndex}`] ? '−' : '+'}
                </ToggleButton>
              </HypothesisHeader>

              {expandedHypotheses[`${methodIndex}-${hypothesisIndex}`] && (
                <>
                  <SectionTitle>Descripción de la Hipótesis</SectionTitle>
                  <TextArea
                    value={hypothesis.text}
                    onChange={(e) => {
                      const updatedMethods = [...methods];
                      updatedMethods[methodIndex].hypotheses[hypothesisIndex].text = e.target.value;
                      useStore.setState({ methods: updatedMethods });
                    }}
                    placeholder="Escribe tu hipótesis"
                  />

                  <SectionTitle>Recolección de Hechos</SectionTitle>
                  <FactContainer>
                    {hypothesis.facts.map((fact: Fact, factIndex: number) => (
                      <FactChip key={factIndex}>
                        {fact.text}
                        <RemoveButton onClick={() => removeFact(methodIndex, factIndex)}>&times;</RemoveButton>
                      </FactChip>
                    ))}
                  </FactContainer>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <AddFactInput
                      type="text"
                      placeholder="Añadir hecho o dato"
                      value={newFact}
                      onChange={(e) => setNewFact(e.target.value)}
                    />
                    <AddButton onClick={() => addFact(methodIndex, newFact)}>Añadir</AddButton>
                  </div>

                  <SectionTitle>Deducción de Consecuencias y Experimentos</SectionTitle>
                  <ExperimentContainer>
                    {hypothesis.experiments.map((experiment: Experiment, experimentIndex: number) => (
                      <ExperimentBlock key={experimentIndex}>
                        <p><strong>Consecuencia:</strong> {experiment.consequence}</p>
                        <p><strong>Experimento:</strong> {experiment.experiment}</p>
                        <CheckButton
                          result={experiment.result}
                          onClick={() => toggleExperimentResult(methodIndex, hypothesisIndex, experimentIndex)}
                        >
                          {experiment.result ? 'Verdadero' : 'Falso'}
                        </CheckButton>
                      </ExperimentBlock>
                    ))}
                  </ExperimentContainer>

                  <TextArea
                    value={newConsequence}
                    onChange={(e) => setNewConsequence(e.target.value)}
                    placeholder="Escribe la consecuencia esperada"
                  />
                  <TextArea
                    value={newExperiment}
                    onChange={(e) => setNewExperiment(e.target.value)}
                    placeholder="Escribe el experimento"
                  />
                  <Button onClick={() => addExperiment(methodIndex, hypothesisIndex, newConsequence, newExperiment)}>
                    Añadir Experimento
                  </Button>
                </>
              )}
            </HypothesisContainer>
          ))}

          <SectionTitle>Crear Nueva Hipótesis</SectionTitle>
          <TextArea
            value={newHypothesis}
            onChange={(e) => setNewHypothesis(e.target.value)}
            placeholder="Escribe una nueva hipótesis"
          />
          <Button onClick={() => addHypothesis(methodIndex, newHypothesis)}>Añadir Hipótesis</Button>
        </Card>
      ))}
    </Container>
  );
};

export default App;

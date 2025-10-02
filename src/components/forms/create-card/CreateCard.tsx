import { useState } from "react";
import TextInput from "../../_ui/inputs/TextInput";
import Backdrop from "../../backdrop/Backdrop";
import SelectInput from "../../_ui/inputs/SelectInput";
import { HiMiniXMark } from "react-icons/hi2";
import TextButton from "../../_ui/buttons/TextButton";
import { useCardContext } from "../../../data/contexts/CardsContext";

interface FormData {
  title: string;
}

interface CreateCardProps {
  onClose: () => void;
}

const CreateCard: React.FC<CreateCardProps> = ({ onClose }) => {
  const [formData, setFormData] = useState<FormData>({ title: "" });

  const { selectCard, selectedCardId, handleSetCardList, selectedTopic } =
    useCardContext();

  const handleNewTopic = () => {
    handleSetCardList([
      ...selectedTopic.flashcards,
      {
        id: 1 + Math.random(),
        question: formData.title,
        answer: "",
        deckId: selectedTopic.id,
        createdAt: new Date("2025-04-01T12:00:00Z"),
        updatedAt: new Date("2025-04-01T12:00:00Z"),
      },
    ]);
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
  };

  // const handleSubmit = () => {
  //   console.log(formData);
  // };

  return (
    <Backdrop>
      <div className="bg-white p-6 rounded-[1.5rem] w-full max-w-2xl shadow-xl ">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-heading font-bold">Nova Pergunta</h2>
          <div onClick={onClose} className="">
            <HiMiniXMark className="text-heading" />
          </div>
        </div>
        <form className="flex flex-col gap-4" action="">
          <TextInput
            id="title"
            name="title"
            type="text"
            // label="Nome da Pelada"
            placeholder="Ex: O que é OOP?"
            value={formData.title}
            onChange={handleInputChange}
          />
          <SelectInput
            id="tags"
            name="tags"
            label="Tags"
            value={""}
            onChange={() => {}}
            className="w-full"
            options={[
              { value: "javascript", label: "Javascript" },
              { value: "react", label: "React" },
              { value: "oop", label: "OOP" },
              { value: "design-system", label: "Design System" },
            ]}
          />
          <div className="mt-8">
            <TextButton title="Adicionar ao Deck" onClick={handleNewTopic} />
          </div>
        </form>
      </div>
    </Backdrop>
  );
};

export default CreateCard;

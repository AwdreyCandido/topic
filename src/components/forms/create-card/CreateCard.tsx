import { useState } from "react";
import TextInput from "../../_ui/inputs/TextInput";
import Backdrop from "../../backdrop/Backdrop";

interface FormData {
  title: string;
}

const CreateCard = () => {
  const [formData, setFormData] = useState<FormData>({ title: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log([e.currentTarget.name, e.currentTarget.value]);
  };

  return (
    <Backdrop>
      <div className="bg-white p-6 rounded-xl w-full max-w-2xl shadow-xl ">
        <div className="mb-8">
          <h2 className="text-heading font-bold">Nova Pelada</h2>
          {/* <p className="text-neutral-500 text">
            Preencha as informações da sua pelada
          </p> */}
        </div>
        <form action="">
          <TextInput
            id="title"
            name="title"
            type="text"
            // label="Nome da Pelada"
            placeholder="Ex: Pelada dos Amigos"
            value={formData.title}
            onChange={handleInputChange}
          />
        </form>
      </div>
    </Backdrop>
  );
};

export default CreateCard;

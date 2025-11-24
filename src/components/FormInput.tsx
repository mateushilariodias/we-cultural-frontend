// src/components/FormInput.tsx
interface FormInputProps {
  label: string;
  type: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  accept?: string; // Adicionar esta linha
}

export default function FormInput({ 
  label, 
  type, 
  name, 
  placeholder, 
  required,
  accept 
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="font-medium">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        accept={accept} // Adicionar esta linha
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-bluePrimary"
      />
    </div>
  );
}
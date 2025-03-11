export function Input({ placeholder, value, onChange, className }) {
    return (
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`border rounded p-2 w-full ${className}`}
      />
    );
  }
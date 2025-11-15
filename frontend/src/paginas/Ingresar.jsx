import { useState } from "react";
import { useAuth } from "../Auth";

export const Ingresar = () => {
  const { error, login } = useAuth();

  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault()

    const result = await login(email, contraseña);

    if (result.success) {
      setOpen(false);
    }
  };

  return (
    <>
      <button onClick={() => setOpen(true)}>Ingresar</button>
      <dialog open={open}>
        <article>
          <h2>Ingrese email y contraseña</h2>
          <form onSubmit={handleSubmit}>
            <fieldset>
              <label htmlFor="email">Email:</label>
              <input
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label htmlFor="contraseña">Contraseña:</label>
              <input
                name="contraseña"
                type="password"
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
              />

              {error && error.length > 0 && (
                <div className="error-messages">
                  {error.split(",").map((msg, index) => (
                    <p key={index} style={{ color: "red", margin: "2px 0" }}>
                      {msg.trim()}
                    </p>
                  ))}
                </div>
              )}
            </fieldset>
            <footer>
              <div className="grid">
                <input
                  type="button"
                  className="secondary"
                  value="Cancelar"
                  onClick={() => setOpen(false)}
                />
                <input type="submit" value="Ingresar" />
              </div>
            </footer>
          </form>
        </article>
      </dialog>
    </>
  );
};
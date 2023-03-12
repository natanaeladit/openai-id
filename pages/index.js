import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [textInput, setTextInput] = useState("");
  const [result, setResult] = useState();
  const [disabled, setDisabled] = useState(false);
  const [buttonText, setButtonText] = useState("Tanya");

  async function onSubmit(event) {
    event.preventDefault();
    try {
      setDisabled(true);
      setButtonText("Berpikir ...");
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: textInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      // const htmlResult = data.result.replace("\n", "<br />");
      setResult(data.result);
      setTextInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
    finally{
      setDisabled(false);
      setButtonText("Tanya");
    }
  }

  return (
    <div>
      <Head>
        <title>Percakapan dengan AI</title>
      </Head>

      <main className={styles.main}>
        <h3>Percakapan dengan AI</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="input"
            placeholder="Isi pertanyaan anda disini ..."
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />
          <input type="submit" value={buttonText} disabled={disabled} />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}

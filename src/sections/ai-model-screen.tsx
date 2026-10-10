import Image from "next/image";
import { aiModel } from "@/data/ai-model";

export function AiModelScreen() {
  return (
    <section className="ai-model-screen" aria-labelledby="ai-model-title" lang="tr">
      <div className="ai-model-content">
        <p className="ai-model-kicker">{aiModel.kicker}</p>
        <h2 className="ai-model-title" id="ai-model-title">
          {aiModel.title}
        </h2>
        <p className="ai-model-description">{aiModel.description}</p>
        <ol className="ai-model-process" aria-label="Model geliştirme aşamaları">
          {aiModel.process.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>
      <figure className="ai-model-visual">
        <Image
          src={aiModel.screenshot.src}
          alt={aiModel.screenshot.alt}
          width={aiModel.screenshot.width}
          height={aiModel.screenshot.height}
          sizes="(max-width: 740px) 100vw, 48vw"
        />
      </figure>
    </section>
  );
}

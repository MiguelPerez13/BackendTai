const { Groq } = require('groq-sdk');
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const generarInformeCarta = async (alumno) => {
    try {
        const jsonAlumno = JSON.stringify(alumno);
        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "Eres un asistente administrativo escolar. Tu tarea es generar informes en formato HTML (solo el contenido del body, sin etiquetas <html> ni <body>) con un estilo de carta formal."
                },
                {
                    role: "user",
                    content: `Genera una card html que sera mostrada en el frontend  con la informacion del alumno:
                    Alumno : ${jsonAlumno}`
                }
            ],
            model: "llama-3.3-70b-versatile", // O el modelo de Groq que prefieras
        });

        // Retornamos el contenido generado por la IA
        return completion.choices[0]?.message?.content || "No se pudo generar el informe.";
        
    } catch (error) {
        console.error("Error con Groq:", error);
        throw new Error("Error al generar el informe con IA");
    }
};

module.exports = {
    generarInformeCarta
};
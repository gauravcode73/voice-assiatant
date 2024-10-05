    const btn = document.querySelector('.talk');
        const content = document.querySelector('.content');

        function speak(text, lang = 'en-US') {
            const text_speak = new SpeechSynthesisUtterance(text);
            text_speak.lang = lang; // Set the language
            text_speak.rate = 1;
            text_speak.volume = 1; // Volume should be between 0 and 1
            text_speak.pitch = 1;

            // Log for debugging purposes
            console.log("Speaking: ", text);

            window.speechSynthesis.speak(text_speak);
        }

        function wishMe() {
            const day = new Date();
            const hour = day.getHours();

            if (hour >= 0 && hour < 12) {
                speak("सुप्रभात!", 'hi-IN'); // Hindi "Good Morning"
            } else if (hour >= 12 && hour < 17) {
                speak("शुभ अपराह्न!", 'hi-IN'); // Hindi "Good Afternoon"
            } else {
                speak("शुभ संध्या!", 'hi-IN'); // Hindi "Good Evening"
            }
        }

        window.addEventListener('load', () => {
            speak("Initializing JARVIS..", 'en-US'); // English speech for initialization
            wishMe();
        });

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = 'hi-IN'; // Set Hindi as the default recognition language

        recognition.onresult = (event) => {
            const currentIndex = event.resultIndex;
            const transcript = event.results[currentIndex][0].transcript;

            // Log recognized speech for debugging
            console.log("Recognized: ", transcript);

            content.textContent = transcript; // Update the content with the recognized speech
            takeCommand(transcript.toLowerCase()); // Process the command
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error: ", event.error);
            speak("मुझे आपकी आवाज़ सुनाई नहीं दे रही है।", 'hi-IN'); // Notify the user about the error
        };

        btn.addEventListener('click', () => {
            content.textContent = "सुन रहा हूँ...."; // Hindi for "Listening..."
            recognition.start();
        });

        function takeCommand(message) {
            if (message.includes('नमस्ते') || message.includes('hello')) {
                speak("नमस्ते, मैं आपकी कैसे सहायता कर सकता हूँ?", 'hi-IN'); // Responding in Hindi
            } else if (message.includes('तुम कौन हो') || message.includes('whose assistant are you')) {
                speak("मैं गौरव सर का सहायक हूँ।", 'hi-IN');
            } else if (message.includes("गूगल खोलो") || message.includes("open google")) {
                window.open("https://www.google.com", "_blank");
                speak("गूगल खोल रहा हूँ...", 'hi-IN');
            } else if (message.includes("यूट्यूब खोलो") || message.includes("open youtube")) {
                window.open("https://www.youtube.com", "_blank");
                speak("यूट्यूब खोल रहा हूँ...", 'hi-IN');
            } else if (message.includes("फेसबुक खोलो") || message.includes("open facebook")) {
                window.open("https://www.facebook.com", "_blank");
                speak("फेसबुक खोल रहा हूँ...", 'hi-IN');
            } else if (message.includes('टाइम क्या हो रहा है') || message.includes('time')) {
                const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
                speak(`अभी समय है ${time}`, 'hi-IN');
            } else if (message.includes('तारीख क्या है') || message.includes('date')) {
                const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
                speak(`आज की तारीख है ${date}`, 'hi-IN');
            } else {
                // Default to searching the message on Google
                window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
                const finalText = "मैंने इसे इंटरनेट पर ढूंढा " + message;
                speak(finalText, 'hi-IN');
            }
        }
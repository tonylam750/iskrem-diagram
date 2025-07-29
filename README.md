# 🍦 Iskrem-diagrammet

En liten webapp hvor brukere kan registrere **hvor mye iskrem de har spist i løpet av sommeren**, og se resultatene presentert i et visuelt diagram.  

---

## Funksjonalitet

- **Opprett bruker og logg inn**  
  Nettsiden har en egen påloggings- og registreringsløsning koblet opp mot **Supabase** (database og autentisering).  

- **To roller:**  
  1. **Iskrem-sjef:** Har tilgang til alle brukere og kan registrere iskrem på vegne av andre.  
  2. **Iskrem-spiser:** Kan kun legge inn hvor mye is de selv har spist.  

- **Dynamisk diagram**  
  Viser hvor mange is som er registrert per bruker i sommer.  

---

## 🗄️ Teknologi

- **Frontend:** Bygget i [React](https://react.dev/) med Vite  
- **Backend:** [Supabase](https://supabase.com/) (autentisering, database og RLS for tilgangsstyring)  

---

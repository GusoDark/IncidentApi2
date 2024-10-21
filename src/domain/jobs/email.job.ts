import cron from 'node-cron';
import { IncidentModel } from '../../data/models/incident.model';
import { EmailService } from '../services/email.service';
import { generateIncidentEmailTemplate } from '../templates/email.template';

export const emailJob = () => {
    const emailService = new EmailService();

    cron.schedule("*/10 * * * * *", async ()=>{
        try {
            const incidents = await IncidentModel.find({ isEmailSent: false });
            
            if (!incidents.length){
                console.log("No hay incidentes por enviar")
                return;
            }

            console.log(`Procesando ${incidents.length} incidentes`)
            await Promise.all(
                incidents.map(async (incident)=>{
                    try {
                        const htmlBody = generateIncidentEmailTemplate(incident.title, incident.description, incident.lat, incident.lng)
                        await emailService.sendEmail({
                            to: "gusog.r.o.87@gmail.com",
                            subject: `Incidente: ${incident.title}`,
                            htmlBody: htmlBody
                        });
                        console.log(`Email enviado para el incidente con ID: ${incident._id}`)
    
                        let updateIncident = {
                            title: incident.title,
                            description: incident.description,
                            lat: incident.lat,
                            lng: incident.lng,
                            isEmailSent: true
                        };
    
                        await IncidentModel.findByIdAndUpdate(incident._id, updateIncident);
                        console.log(`Incidente actualizado para el ID: ${incident._id}`)
                    } catch (error) {
                        console.error("Error al procesar el incidente")
                    }
                })
            );

        } catch (error) {
            console.error("Error durante el envio de correo")
        }
    });
}
import { Request, Response } from "express"
import { IncidentModel } from "../../../data/models/incident.model";

export class IncidentController{
  public getIncidents = async (req: Request, res: Response) => {
    //res.send("Obteniendo los datos");
    try{
      const incidents = await IncidentModel.find();
      return res.json(incidents);
    }catch(error){
      return res.json([]);
    }
  }
  public createIncident = async (req: Request, res: Response) => {
    //res.send("Creando Incidente");
    try{
      const { title, description, lat, lng} = req.body;
      const newIncident = await IncidentModel.create({
        title,
        description,
        lat,
        lng
      });
      res.json(newIncident)
    }catch(error){
      res.json({message:"Error creando registro"});
    }
  }

  public getIncidentById = async (req: Request, res: Response) => {
    try{
      const { id } = req.params;
      const incident = await IncidentModel.findById(id);
      return res.json(incident)
    } catch(error){
      return res.json({message:"Ocurrio un error al traer el incidente"});
    }
  }

  public updateIncident = async (req: Request, res: Response) => {
    
    try{
      const {id} = req.params;
      const { title, description, lat, lng } = req.body;
      await IncidentModel.findByIdAndUpdate(id,{
        title,
        description,
        lat,
        lng
      });
      const updatedIncident = IncidentModel.findById(id);
      return res.json(updatedIncident);
    }catch(error){
      return res.json({message:"No se pudo actualizar el incidente"})
    }
  }

  public deleteIncident = async (req: Request, res: Response) => {
    
    try{
      const {id} = req.params;
      const deleteIncident = await IncidentModel.findByIdAndDelete(id)
      return res.json(deleteIncident);
    }catch(error){
      return res.json({message:"No se pudo actualizar el incidente"});
    }
  }
}
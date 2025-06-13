export interface Observation {
    Id: number;
    Name: string;
    Datas: SamplingData[];
  }
  
  export interface SamplingData {
    SamplingTime: string;
    Properties: Property[];
  }
  
  export interface Property {
    Value: string | number | boolean;
    Label: string;
  }

  export interface SummaryObservation {
    samplingTime: string;
    projectName: string;
    constructionCount?: number;
    isConstructionCompleted?: boolean;
    lengthOfRoad?: number;
  }
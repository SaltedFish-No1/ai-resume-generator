// lib/utils/resumeUtils.ts
import { 
    ResumeData, 
    BasicInfoData, 
    SkillsData, 
    EducationData, 
    ExperienceData, 
    ProjectData, 
    OtherInfoData,
    ResumeFileData 
  } from '@/types/resume'
  
  export function extractBasicInfo(data: ResumeData): BasicInfoData {
    const {
      fullName,
      email,
      phone,
      jobTitle,
      summary,
      availability,
      locationPreference,
      socialLinks
    } = data
  
    return {
      fullName,
      email,
      phone,
      jobTitle,
      summary,
      availability,
      locationPreference,
      socialLinks
    }
  }
  
  export function extractSkills(data: ResumeData): SkillsData {
    return data.skills || []
  }
  
  export function extractEducation(data: ResumeData): EducationData {
    return data.education
  }
  
  export function extractExperience(data: ResumeData): ExperienceData {
    return data.experience || []
  }
  
  export function extractProjects(data: ResumeData): ProjectData {
    return data.projects || []
  }
  
  export function extractOtherInfo(data: ResumeData): OtherInfoData {
    const { publications, awards, certifications } = data
    return {
      publications,
      awards,
      certifications,
    }
  }
  
  export function extractResumeFileUrl(data: ResumeData): ResumeFileData {
    return data.resumePdfUrl
  }
  
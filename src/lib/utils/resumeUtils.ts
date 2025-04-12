// lib/utils/resumeUtils.ts
import { 
    ResumeData, 
    BasicInfoData, 
    SkillsData, 
    EducationData, 
    ExperienceData, 
    ProjectData, 
    PublicationData, 
    AwardsData, 
    CertificationData, 
    SocialLinksData, 
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
  
  export function extractPublications(data: ResumeData): PublicationData {
    return data.publications || []
  }
  
  export function extractAwards(data: ResumeData): AwardsData {
    return data.awards || []
  }
  
  export function extractCertifications(data: ResumeData): CertificationData {
    return data.certifications || []
  }
  
  export function extractSocialLinks(data: ResumeData): SocialLinksData {
    return data.socialLinks || []
  }
  
  export function extractResumeFileUrl(data: ResumeData): ResumeFileData {
    return data.resumePdfUrl
  }
  
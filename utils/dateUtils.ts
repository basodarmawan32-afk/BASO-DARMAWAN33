import { AgeResult } from '../types';

export const getZodiacSign = (day: number, month: number): string => {
  const zodiacSigns = [
    'Capricorn', 'Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini',
    'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius'
  ];
  
  // Note: month is 0-indexed in JS Date, but usually 1-indexed for logic. 
  // Here we assume month is 1-12 passed from the caller or adjusted.
  // Actually, let's keep it simple: input month 1-12.
  
  if ((month === 1 && day <= 19) || (month === 12 && day >= 22)) return 'Capricorn';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius';
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return 'Pisces';
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius';
  
  return '';
};

export const calculateAge = (birthDateString: string): AgeResult | null => {
  const birthDate = new Date(birthDateString);
  const today = new Date();

  if (isNaN(birthDate.getTime())) return null;
  if (birthDate > today) return null;

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    // Get days in the previous month of today
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  // Calculate total days
  const diffTime = Math.abs(today.getTime() - birthDate.getTime());
  const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Next Birthday
  const nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
  if (today > nextBirthday) {
    nextBirthday.setFullYear(today.getFullYear() + 1);
  }
  const diffNextBirthday = Math.abs(nextBirthday.getTime() - today.getTime());
  const nextBirthdayDays = Math.ceil(diffNextBirthday / (1000 * 60 * 60 * 24));

  const zodiac = getZodiacSign(birthDate.getDate(), birthDate.getMonth() + 1);

  return {
    years,
    months,
    days,
    totalDays,
    nextBirthdayDays,
    zodiac
  };
};
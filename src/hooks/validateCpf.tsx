export const validateCPF = (cpf: string): boolean => {
    // Verifica o formato usando regex
    const cpfFormat = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if (!cpfFormat.test(cpf)) return false;
  
    // Remove caracteres não numéricos
    const cleanedCPF = cpf.replace(/\D/g, '');
  
    // Verifica se tem 11 dígitos e não é uma sequência inválida
    if (
      cleanedCPF.length !== 11 ||
      [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
      ].includes(cleanedCPF)
    ) {
      return false;
    }
  
    // Validação dos dígitos verificadores
    let sum = 0;
    let remainder: number;
  
    // Primeiro dígito verificador
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleanedCPF.charAt(i)) * (10 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10) remainder = 0;
    if (remainder !== parseInt(cleanedCPF.charAt(9))) return false;
  
    // Segundo dígito verificador
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cleanedCPF.charAt(i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10) remainder = 0;
    if (remainder !== parseInt(cleanedCPF.charAt(10))) return false;
  
    return true;
  };
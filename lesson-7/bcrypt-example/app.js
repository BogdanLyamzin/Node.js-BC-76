import bcrypt from "bcrypt";

const hashPassword = async password => {
    // const salt = await bcrypt.genSalt(10);
    // console.log(salt);
    const result = await bcrypt.hash(password, 10);
    const result2 = await bcrypt.hash(password, 10);
    console.log(result);
    console.log(result2);
    const compareResul1 = await bcrypt.compare(password, result);
    console.log(compareResul1);
    const compareResul2 = await bcrypt.compare("123457", result);
    console.log(compareResul2);
}

hashPassword("123456");
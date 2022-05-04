import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { User } from '../entities/user.entity';
import { Role, RoleKey } from '../entities/role.entity';
import * as dotenv from 'dotenv';
import * as bcrypt from 'bcrypt';
import { UserRole } from '../entities/user_role.entity';
import { City } from '../entities/city.entity';
import { Type } from '../entities/type.entity';
import { Trainer } from '../entities/trainer.entity';

import * as csv from 'csv-parser';
import * as fs from 'fs';

dotenv.config();

export default class Seeds implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    let typesStream = fs.createReadStream('types.csv');
    const typeRepo = connection.getRepository(Type);
    typesStream
      .pipe(csv())
      .on('data', async (type) => {
        console.log('adding type', type.name);
        let t = new Type();
        t.name = type.name;
        t.physical = type.physical;
        t.likes = type.likes;
        t.personality = type.personality;
        t.morals = type.morals;
        let res = await typeRepo.save(t);
        console.log(res);
      })
      .on('end', () => {});

    let citiesStream = fs.createReadStream('cities.csv');
    const cityRepo = connection.getRepository(City);
    citiesStream
      .pipe(csv())
      .on('data', async (city) => {
        let c = new City();
        c.name = city.name;
        c.physical = city.physical;
        c.likes = city.likes;
        c.personality = city.personality;
        c.morals = city.morals;
        let res = await cityRepo.save(c);
        console.log(res);
      })
      .on('end', () => {});

    let trainersStream = fs.createReadStream('trainers.csv');
    const trainerRepo = connection.getRepository(Trainer);
    trainersStream
      .pipe(csv())
      .on('data', async (trainer) => {
        let t = new Trainer();
        t.name = trainer.name;
        t.slug = trainer.slug;
        t.physical = trainer.physical;
        t.likes = trainer.likes;
        t.personality = trainer.personality;
        t.morals = trainer.morals;
        let res = await trainerRepo.save(t);
        console.log(res);
      })
      .on('end', () => {});

    // CREATE ROLES
    console.log('\nCreating Roles');

    const roleObjects = Role.ROLES.map((key) => ({ key }));
    const roleRepository = connection.getRepository(Role);
    for (const roleObj of roleObjects) {
      // only insert roles if not present already
      const role = await roleRepository.findOne(roleObj);
      if (!role) {
        console.log(`Creating role '${roleObj.key}'`);
        await roleRepository.insert(roleObj);
      } else {
        console.log(`Role '${role.key}' already exists`);
      }
    }

    // CREATE ADMIN USER
    const userRepository = connection.getRepository(User);
    let adminUser = await userRepository.findOne({ email: process.env.ADMIN_EMAIL });
    if (!adminUser) {
      const adminRole = await roleRepository.findOne({ key: RoleKey.ADMIN });
      console.log(`\nCreating Admin User with email ${process.env.ADMIN_EMAIL}`);
      console.log(adminRole);
      const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      adminUser = new User();
      adminUser.email = process.env.ADMIN_EMAIL;
      adminUser.passwordHash = passwordHash;
      adminUser.firstName = 'Admin';
      adminUser.lastName = 'Site';
      const adminUserRole = new UserRole();
      adminUserRole.role = adminRole;
      adminUser.userRoles = [adminUserRole];
      await userRepository.save(adminUser);
    } else {
      console.log(`\nAdmin User with email ${process.env.ADMIN_EMAIL} already exists`);
    }

  }
}

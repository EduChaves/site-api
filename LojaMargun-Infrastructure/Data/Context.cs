﻿using LojaMargun_Domain.Entities;
using LojaMargun_Infrastructure.Data.Mappers;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace LojaMargun_Infrastructure.Data
{
    public class Context : IdentityDbContext<User, Role, string>
    {
        public DbSet<Product> Products { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Bag> Bags { get; set; }
        public DbSet<Sale> Sales { get; set; }

        public Context(DbContextOptions<Context> context) : base(context) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.ApplyConfiguration(new ClientMap());
            builder.ApplyConfiguration(new CategoryMap());
            builder.ApplyConfiguration(new BagMap());
            builder.ApplyConfiguration(new ProductMap());
            builder.ApplyConfiguration(new SaleMap());
            builder.ApplyConfiguration(new RoleMap());
            builder.ApplyConfiguration(new UserMap());
        }
    }
}
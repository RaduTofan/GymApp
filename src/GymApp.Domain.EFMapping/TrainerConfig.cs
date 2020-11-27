using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GymApp.Domain;

namespace GymApp.Domain.EFMapping
{
    public class TrainerConfig : IEntityTypeConfiguration<Trainer>
    {
        public void Configure(EntityTypeBuilder<Trainer> builder)
        {
            builder.HasIndex(e => e.Phone)
                    .IsUnique();

            builder.HasKey(e => e.Id);

            builder.Property(e => e.DateOfBirth).HasColumnType("date").IsRequired();

            builder.Property(e => e.Email)
                .IsRequired()
                .HasMaxLength(255)
                .IsUnicode(false);

            builder.Property(e => e.Experience).HasDefaultValueSql("((0))");

            builder.Property(e => e.FullName).HasMaxLength(255).IsRequired();

            builder.Property(e => e.Phone)
                .IsRequired()
                .HasMaxLength(255)
                .IsUnicode(false);
        }
    }
}

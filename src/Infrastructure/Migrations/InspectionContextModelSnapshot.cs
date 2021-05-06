﻿// <auto-generated />
using System;
using InspectionManager.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace InspectionManager.Infrastructure.Migrations
{
    [DbContext(typeof(InspectionContext))]
    partial class InspectionContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "5.0.5");

            modelBuilder.Entity("InspectionManager.ApplicationCore.Entities.Choice", b =>
                {
                    b.Property<int>("ChoiceId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int?>("InspectionItemId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("OrderIndex")
                        .HasColumnType("INTEGER");

                    b.HasKey("ChoiceId");

                    b.HasIndex("InspectionItemId");

                    b.ToTable("Choices");
                });

            modelBuilder.Entity("InspectionManager.ApplicationCore.Entities.ChoiceTemplate", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("ChoiceTemplateId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("ChoiceTemplates");
                });

            modelBuilder.Entity("InspectionManager.ApplicationCore.Entities.Equipment", b =>
                {
                    b.Property<int>("EquipmentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("EquipmentName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int?>("InspectionSheetId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("OrderIndex")
                        .HasColumnType("INTEGER");

                    b.HasKey("EquipmentId");

                    b.HasIndex("InspectionSheetId");

                    b.ToTable("Equipment");
                });

            modelBuilder.Entity("InspectionManager.ApplicationCore.Entities.InputType", b =>
                {
                    b.Property<int>("InputTypeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("InputTypeId");

                    b.ToTable("InputTypes");
                });

            modelBuilder.Entity("InspectionManager.ApplicationCore.Entities.InspectionGroup", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("InspectionGroups");
                });

            modelBuilder.Entity("InspectionManager.ApplicationCore.Entities.InspectionItem", b =>
                {
                    b.Property<int>("InspectionItemId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int?>("EquipmentId")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("InputTypeId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("InspectionContent")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("OrderIndex")
                        .HasColumnType("INTEGER");

                    b.HasKey("InspectionItemId");

                    b.HasIndex("EquipmentId");

                    b.HasIndex("InputTypeId");

                    b.ToTable("InspectionItems");
                });

            modelBuilder.Entity("InspectionManager.ApplicationCore.Entities.InspectionSheet", b =>
                {
                    b.Property<int>("InspectionSheetId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int?>("InspectionGroupId")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("InspectionTypeId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("SheetName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("InspectionSheetId");

                    b.HasIndex("InspectionGroupId");

                    b.HasIndex("InspectionTypeId");

                    b.ToTable("InspectionSheets");
                });

            modelBuilder.Entity("InspectionManager.ApplicationCore.Entities.InspectionType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("InspectionTypes");
                });

            modelBuilder.Entity("InspectionManager.ApplicationCore.Entities.Option", b =>
                {
                    b.Property<int>("OptionId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int?>("ChoiceTemplateId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("OptionId");

                    b.HasIndex("ChoiceTemplateId");

                    b.ToTable("Options");
                });

            modelBuilder.Entity("InspectionManager.ApplicationCore.Entities.Choice", b =>
                {
                    b.HasOne("InspectionManager.ApplicationCore.Entities.InspectionItem", null)
                        .WithMany("Choices")
                        .HasForeignKey("InspectionItemId");
                });

            modelBuilder.Entity("InspectionManager.ApplicationCore.Entities.Equipment", b =>
                {
                    b.HasOne("InspectionManager.ApplicationCore.Entities.InspectionSheet", null)
                        .WithMany("Equipments")
                        .HasForeignKey("InspectionSheetId");
                });

            modelBuilder.Entity("InspectionManager.ApplicationCore.Entities.InspectionItem", b =>
                {
                    b.HasOne("InspectionManager.ApplicationCore.Entities.Equipment", null)
                        .WithMany("InspectionItems")
                        .HasForeignKey("EquipmentId");

                    b.HasOne("InspectionManager.ApplicationCore.Entities.InputType", "InputType")
                        .WithMany()
                        .HasForeignKey("InputTypeId");

                    b.Navigation("InputType");
                });

            modelBuilder.Entity("InspectionManager.ApplicationCore.Entities.InspectionSheet", b =>
                {
                    b.HasOne("InspectionManager.ApplicationCore.Entities.InspectionGroup", "InspectionGroup")
                        .WithMany()
                        .HasForeignKey("InspectionGroupId");

                    b.HasOne("InspectionManager.ApplicationCore.Entities.InspectionType", "InspectionType")
                        .WithMany()
                        .HasForeignKey("InspectionTypeId");

                    b.Navigation("InspectionGroup");

                    b.Navigation("InspectionType");
                });

            modelBuilder.Entity("InspectionManager.ApplicationCore.Entities.Option", b =>
                {
                    b.HasOne("InspectionManager.ApplicationCore.Entities.ChoiceTemplate", null)
                        .WithMany("Choices")
                        .HasForeignKey("ChoiceTemplateId");
                });

            modelBuilder.Entity("InspectionManager.ApplicationCore.Entities.ChoiceTemplate", b =>
                {
                    b.Navigation("Choices");
                });

            modelBuilder.Entity("InspectionManager.ApplicationCore.Entities.Equipment", b =>
                {
                    b.Navigation("InspectionItems");
                });

            modelBuilder.Entity("InspectionManager.ApplicationCore.Entities.InspectionItem", b =>
                {
                    b.Navigation("Choices");
                });

            modelBuilder.Entity("InspectionManager.ApplicationCore.Entities.InspectionSheet", b =>
                {
                    b.Navigation("Equipments");
                });
#pragma warning restore 612, 618
        }
    }
}
